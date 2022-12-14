const mongoose = require('mongoose');
const warehouseOwnerModel = require('../models/WarehouseOwner');
const jwt = require('jsonwebtoken');
const warehouseSchema = require('../models/warehouseSchema');
const crypto = require('crypto');
const dotenv = require('dotenv')
const jwtDecode = require('jwt-decode');
const manageUsersAndWarehousesSchema = require('../models/manageUsersAndWarehousesSchema');
const userSchema = require('../models/usersSchema')
const extensions = require('../helper/extensions');


dotenv.config({ path: __dirname + '/../.env' })

const {
    hashType,
    encodeAs,
    jwtSecret,
    stripeSecretKey
} = process.env

const stripe = require('stripe')(`${stripeSecretKey}`);

//Register
const register = async (req, res) => {
    try {

        const { userName, email, password, phoneNumber, cardNumber, cardExpires, cardCode, cardName } = req.body;

        const alreadyExist = warehouseOwnerModel.find({
            email: email
        })

        if(alreadyExist.length > 0){
            return res.send('alreadyExist').status(403)
        }

        const account = await stripe.accounts.create({
            country: 'US',
            type: 'express',
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
            },
        });


        await warehouseOwnerModel.create({
            userName: userName,
            email: email,
            password: crypto.createHash(hashType).update(password).digest(encodeAs),
            phoneNumber: phoneNumber,
            cardNumber: cardNumber,
            cardExpires: cardExpires,
            cardCode: cardCode,
            cardName: cardName,
            stripeAccountId: account.id
        })

        const accountLink = await stripe.accountLinks.create({
            account: `${account.id}`,
            refresh_url: `http://localhost:3000/login`,
            return_url: 'http://localhost:3000/login',
            type: 'account_onboarding',
            collect: 'currently_due',
          });

          let obj = {accountLink: accountLink, accountId: account.id}   

        return res.send(obj).status(200)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "an error occured at register function " });
    }
}

// TODO: add it to the login phase
const completeStripeAccount = async  (ownerAccountId) => {

    try{

        const accountId = ownerAccountId


        const capability = await stripe.accounts.updateCapability(
            `${accountId}`,
            'card_payments',
            {requested: true}
          );

          
    }
    catch(err){
        console.log(`error at completeStripeAccount ${err.message}`)
    }

}

//Login
const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await warehouseOwnerModel.findOne({
            email
        })

        if (!user) return res.status(400).json({ message: "user does not exist" });

        // verify password
        if ((crypto.createHash(hashType).update(password).digest(encodeAs) != user.password))
            return res.status(403).json({ message: "incorrect password!" })

        // create token
        const payload = {
            user
        }
        user.image = 'null'
        await jwt.sign({ user: user, role: 'warehouseOwner' }, jwtSecret, async (err, token) => {
            completeStripeAccount(user.stripeAccountId)
            await res.cookie('jwt', `${token}`, { httpOnly: true })
            res.status(200).json(token)
        })



    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "an error occured at login function" });
    }
}

//logout
const logout = async (req, res) => {
    try {

        if (req.cookies.token) {
            res.clearCookie("token");
            return res.sendStatus(200);
        } else {
            return res.sendStatus(400);
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "an error occured at logout function" });
    }
}

const getRequests = async (req, res) => {
    try {
        const userInfo = jwtDecode(req.cookies['jwt'])
        const results = await manageUsersAndWarehousesSchema.find({
            status: 'pending',
            warehouseOwnerEmail: userInfo.user.email
        })

        return res.send(results).status(200)
    }
    catch (err) {
        console.log(`error at getRequest function ${err.message}`)
    }
}

const acceptDeclineRequest = async (req, res) => {
    try {

        const requestId = req.body.requestId
        let requestStatus = req.body.status
        const warehouseId = req.body.warehouseId
        const decodedInfo = jwtDecode(req.cookies['jwt'])

        const results = await manageUsersAndWarehousesSchema.findOne({
            _id: requestId
        })

        const requestedDate = [results.startRentDate, results.endRentDate]
        let returnStatus = ''
        
        

        if (requestStatus == 'accepted') {
         
            await extensions.userRentAWarehouseInSpecificDate(warehouseId, requestedDate).then(async (response) => {
              
                if (response) { 
                    requestStatus = 'accepted'
                    returnStatus = 'accepted'

             } else { 


                  await stripe.refunds.create({
                    payment_intent: `${results.paymentId}`,
                    amount: results.price * 100,
                },{
                        stripeAccount: `${decodedInfo.user.stripeAccountId}`,
                      }
                  );


                 requestStatus = 'rejected'
                 returnStatus = 'rejected cause of time conflict'
                 }

                await manageUsersAndWarehousesSchema.updateOne({
                    _id: requestId
                }, {
                    $set: {
                        status: requestStatus
                    }
                }
                )
            })
            
        }else{
            
            await stripe.refunds.create({
                payment_intent: `${results.paymentId}`,
                amount: results.price * 100,
                reverse_transfer:'true'
            });

            returnStatus = 'rejected'
            await manageUsersAndWarehousesSchema.updateOne({
                _id: requestId
            }, {
                $set: {
                    status: 'rejected'
                }
            }
            )

        }

        return res.send(`updated request with id ${requestId} status to ${returnStatus}`).status(200)

    }
    catch (err) {
        console.log(`error at acceptDeclineRequest => ${err.message}`)
    }
}

// POST request to add a warehouseowner

const addWarehouses = async (req, res) => {
    try {
        const warehouse = req.body;
        const decodedInfo = jwtDecode(req.cookies['jwt'])
        const result = await warehouseSchema.create(warehouse);
        await result.save()
        await warehouseOwnerModel.updateOne({
            _id: decodedInfo.user._id
        },{
            $push: {
                myWarehouses: result._id
            }
        })

        if (result) {
            res.status(201).json({ message: "added WareHouse" })


        } else {
            res.status(409).json({ message: "failed to add WareHouse" })
        }

    } catch (error) {
        res.status(500).json({ message: "error at addWarehouse function" })

    }
}

// GET request for a list of all warehouseOwner
const getWarehouses = async (req, res) => {
    try {

        const decodedInfo = jwtDecode(req.cookies['jwt'])
        let myWarehousese = []

        const owner = await warehouseOwnerModel.findOne({
            email: decodedInfo.user.email
        })

        for (let i = 0; i < owner.myWarehouses.length; i++) {

            let warehouse = await warehouseSchema.find({
                _id: owner.myWarehouses[i]
            })

            myWarehousese.push(warehouse[0])
        }

        return res.status(200).send(myWarehousese)
    }
    catch (error) {
        res.status(500).json({ message: "internal error with function get all warehouses" })

    }
}


// DELETE request to delete a WarehouseOwner
const deleteWarehouse = async (req, res) => {

    try {
        const _Id = req.body._Id
        await warehouseSchema.findOneAndDelete({ _Id: _Id })
        res.status(200).json({ message: "warehouse deleted" })
    }
    catch (error) {
        res.status(500).json({ message: "internal error with fucntion delete warehouse" })

    }

}

const getWarehouseDetails = async (req, res) => {
    try{

        const warehouseId = req.body.warehouseId

        const oldRequests = await manageUsersAndWarehousesSchema.find({
            WarehouseId: warehouseId,
            status: 'accepted'
        })

        const warehouseInfo = await warehouseSchema.find({
        _id: warehouseId
        })

        let object = {
            oldRequests:oldRequests,
            warehouseInfo: warehouseInfo
        }

        return res.send(object).status(200)

    }
    catch(err){
        console.log(`error at getWarehouseDetails in warehouseOwnerController ${err.message}`)
    }
}

const addComment = async (req, res) => {
    try {
        const content = req.body.content
        const warehouseId = req.body.warehouseId
        const decodedInfo = jwtDecode(req.cookies['jwt'])


        const results = await warehouseSchema.updateOne({
            _id: warehouseId
        }, {
            $push: {
                feedback: [{

                    comentorEmail: decodedInfo.user.email,
                    content: content
                }]
            }
        })
        if (results.acknowledged) {
            return res.send({ comentorEmail: decodedInfo.user.email, content: content, addedIn: new Date() }).status(200)
        } else {
            return res.status(424).send('Failed to add the comment')
        }
    }
    catch (err) {
        console.log(`error in addComment  => ${err.message}`)
    }
}

const getProfileModalInfo = async (req, res) => {
    try{

        const userInfo = await userSchema.findOne({
            userEmail:`${req.body.userEmail}`
        })

        const requestsInfo = await manageUsersAndWarehousesSchema.find({
            userEmail: userInfo.email
        })
        
        return res.send({
            personalInfo: userInfo,
            otherInfo: requestsInfo
        }).status(200)
    }
    catch(err){
        console.log(`error at getProfileModalInfo => ${err.message}`)
    }
}

const getOwnerInfo = async (req, res) => {
    try{
        const myInfo = jwtDecode(req.cookies['jwt'])
        const arrOfWarehousesId = myInfo.user.myWarehouses
         let allWarehousesData 

        const info =  await warehouseOwnerModel.findOne({
            _id: myInfo.user._id
         })

         await extensions.getCurrentOwnerWarehousesWithRequests(arrOfWarehousesId).then((results) => {
            allWarehousesData = results
         })

         return res.send({
            warhousesData: allWarehousesData,
            myInfo: info
        }).status(200)
    }
    catch(err){
        console.log(`error at getOwnerInfo ${err.message}`)
    }
}

const getUser = async (req, res) =>{
    try{
        const userEmail = req.body.userEmail

        const results = await userSchema.findOne({
            email: userEmail
        })

        
        return res.send(results).status(200)
        
    }catch(err){
        console.log(`error at getUser => ${err.message}`)
    }

}

const updateImg = async (req, res) => {
    try{

        const decodedInfo = jwtDecode(req.cookies['jwt'])
        const img = req.body.image
        
        const results = await warehouseOwnerModel.updateOne({
            _id: decodedInfo.user._id
        }, {
            $set: {
                image: img
            }
        }
        )
        return res.send(results).status(200)
    }
    catch(err){
        console.log(`error at updateImg => ${err.message}`)
    }
}

const getProfile = async (req, res) => {
    try{   
        const decodedUser = jwtDecode(req.cookies['jwt'])
        const results=await warehouseOwnerModel.findOne({
            _id:decodedUser.user._id

        })
        return res.send(results).status(200);

    }
    catch(err){
        console.log(`error at get`)
    }
}

const addReply = async (req, res) => {
    try {
        const warehouseId = req.body.warehouseId
        const content = req.body.content
        const arrOfCommentsIndex = req.body.arrIndex
        const decodedInfo = jwtDecode(req.cookies['jwt'])

       const warehouse = await warehouseSchema.findOne({
            _id: warehouseId
        })
        let currentFeedback = warehouse.feedback
        currentFeedback[arrOfCommentsIndex].push({
            comentorEmail: decodedInfo.user.email,
            content: content
        })

        await warehouseSchema.updateOne({
            _id: warehouseId
        },{

            feedback: currentFeedback

        })

        return res.send(decodedInfo.user.email)
    }
    catch (err) {
        console.log(`Error at addReply => ${err.message}`)
    }

}



module.exports = {
    register,
    login,
    logout,
    getRequests,
    addWarehouses,
    getWarehouses,
    acceptDeclineRequest,
    deleteWarehouse,
    getWarehouseDetails,
    completeStripeAccount,
    addComment,
    getProfileModalInfo,
    getOwnerInfo,
    getUser,
    updateImg,
    getProfile,
    addReply
}