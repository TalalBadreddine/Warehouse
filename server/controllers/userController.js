const warehouseSchema = require('../models/warehouseSchema')
const userSchema = require('../models/usersSchema')
const manageUsersAndWarehousesSchema = require('../models/manageUsersAndWarehousesSchema')
const jwtDecode = require('jwt-decode')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const dotenv = require('dotenv')
const extensions = require('../helper/extensions')

dotenv.config({path: __dirname + '/../.env'})

const {
    hashType,
    encodeAs,
    jwtSecret,
    stripeSecretKey
} = process.env

const stripe = require('stripe')(`${stripeSecretKey}`);



const getWareHousesForUsers = async (req, res) => {
    try{

        await extensions.getEveryWarehouseOwnerAndHisWareHouses().then((results) => {
            return res.send(results).status(200)
        })

    }
    catch(err){
        console.log(`error at getWareHousesForUsers => ${err.message}`)
    }

}

const userLogin = async (req, res) => {
    try{

        const userInfo = req.body
 
        const userFromDb = await userSchema.findOne({
            email: userInfo.email
        })
 
        
        if(!userFromDb){
            return res.send('Does not exist').status(404)
          
        }
   
        else if(userFromDb.password != crypto.createHash(hashType).update(userInfo.password).digest(encodeAs)){
            return res.send('wrong password').status(403)
           
        }

        else if(!userFromDb.isActive ){
            return res.send('Inactive').status(403)
            
        }else {

       
        await jwt.sign({user: userFromDb, role: 'user'}, jwtSecret, async (err, token) => {
            await res.cookie('jwt', `${token}`, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 })
            return res.status(200).send(true)
        })
        
    }

    }
    catch(err){
        console.log(`error at userLogin => ${err.message}`)
    }
}


const userRegister = async (req, res) => {
    try{

        const userInfo = req.body

        const usersWithSameEmail = await userSchema.find({
            email: userInfo.email
        })

        if(usersWithSameEmail.length >= 1 ) return res.send('exist').status(409)   // 409 => conflict

        let user = new userSchema({

            email: userInfo.email,
            password: crypto.createHash(hashType).update(userInfo.password).digest(encodeAs)

        })

        await user.save()

        return res.send('added').status(200)
    }
    catch(err){
        console.log(`err at userRegisterFunction => ${err.message}`)
    }
}

// first build  request rent for warehouse
const getAllUserRequests = async (req, res) => {
    try{

        const decode = jwtDecode(req.cookies['jwt'])
        console.log(decode)
        const allUserRequests = await manageUsersAndWarehousesSchema.find({
            userEmail: decode.user.email
        })
        console.log(allUserRequests)

        return res.send(allUserRequests).status(200)
    }
    catch(err){
        console.log(`err at getAllUserRequests => ${err.message}`)
    }
}


// resolve time conflict
const requestRentWarehouse = async (req, res) => {
    const warehouseInfo = req.body.warehouseData
    const warehouseOwnerDetails = warehouseInfo.Owner
    const rentingDate = req.body.rentingDate
    const totalPrice = req.body.totalPrice
    const decodedInfo = jwtDecode(req.cookies['jwt'])
    
    await extensions.checkIfTimeIsAvailbleWithWarehouseTime(warehouseInfo.datesAvailable , rentingDate).then(async (results) => {

        if(results){
            
            let relation = new manageUsersAndWarehousesSchema({

                userEmail: decodedInfo.user.email,
                WarehouseId: warehouseInfo._id,
                startRentDate: rentingDate[0],
                endRentDate: rentingDate[1],
                price: parseInt(totalPrice),
                warehouseName: warehouseInfo.name,
                warehouseOwnerName: warehouseOwnerDetails.ownerName,
                warehouseOwnerEmail: warehouseOwnerDetails.email

            })

            await relation.save()

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                  price_data: {
                    currency: 'usd',
                    unit_amount: totalPrice * 100,
                    product_data: {
                      name: warehouseInfo.name,
                      description: `renting ${warehouseInfo.name} from ${new Date(relation.startRentDate).toISOString().slice(0, 10) } to ${new Date(relation.endRentDate).toISOString().slice(0, 10)}`,
                    },
                  },
                  quantity: 1,
                }],
    
                mode: 'payment',
                success_url: 'http://localhost:3000/customer/requests',
                cancel_url: 'http://localhost:3000/customer/',
              });
              //TODO: add path for payment
            //   payment_intent_data: {
            //     transfer_data: {
            //         destination: warehouseOwnerDetails.stripeId
            //     }
            // },

            return res.send(session).status(200)

        }

        return res.send('not availble').status(410)

    })
}

const testPayment = async (req, res) => {
    // const capabilities = await stripe.accounts.listCapabilities(
    //     ''
    //   );
      
      const transfer = await stripe.transfers.create({
        amount: 7000,
        currency: 'usd',
        destination: 'acct_1LWggURe4M9JlCWK',
        transfer_group: '1',
      });
      

      console.log(session)
      return res.send(session)
}

const getWarehouseInfo =  async (req, res) => {
    try{
        const warehouseId = req.body.warehouseId

        const results = await warehouseSchema.find({
            _id: warehouseId
        })

        return res.send(results[0]).status(200)
    }
    catch(err){
        console.log(`error at the getWarehouseInfo ${err.message}`)
    }
}

const addComment = async (req, res) => {
    try{
        const content = req.body.content
        const warehouseId = req.body.warehouseId
        const decodedInfo = jwtDecode(req.cookies['jwt'])
    

        const results = await warehouseSchema.updateOne({
            _id: warehouseId
        },{
            $push: {
                feedback: [{

                    comentorEmail: decodedInfo.user.email,
                    content: content
                }]
            }
        })
       if(results.acknowledged){
           return res.send( {comentorEmail: decodedInfo.user.email, content: content, addedIn: new Date()} ).status(200)
       }else{
           return res.status(424).send('Failed to add the comment')
       }
    }
    catch(err){
        console.log(`error in addComment  => ${err.message}`)
    }
}

const addReply = async (req, res) => {
    try{
        const warehouseId = req.body.warehouseId
        const content = req.body.content
        const arrOfCommentsIndex = req.body.arrIndex
        const decodedInfo = jwtDecode(req.cookies['jwt'])
        const test = 'feedback.'+ arrOfCommentsIndex

        // 'feedback.pos': {

        //     comentorEmail: decodedInfo.user.email,
        //     content: content

        // }
        
        // await warehouseSchema.updateOne({
        //     _id: warehouseId
        // },{
        //     $push:{
        //         "feedback.arrOfCommentsIndex": {

        //             comentorEmail: decodedInfo.user.email,
        //             content: content

        //         }
        //     }
        // },)
        return res.send('good')
    }
    catch(err){
        console.log(`Error at addReply => ${err.message}`)
    }

}


module.exports = {
    getWareHousesForUsers,
    userLogin,
    userRegister,
    requestRentWarehouse,
    getAllUserRequests,
    testPayment,
    addComment,
    getWarehouseInfo,
    addReply
}

