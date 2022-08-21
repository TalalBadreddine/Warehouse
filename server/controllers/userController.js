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
    jwtSecret
} = process.env


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
    try {
    
        const {email, password} = req.body; 

        const user = await userSchema.findOne({
            email
        })

        if(!user) return res.status(400).json({message : "user does not exist"});        

        // verify password
        if(( crypto.createHash(hashType).update(password).digest(encodeAs) != user.password)) 
            return res.status(403).json({message : "incorrect password!"})

        // create token
        const payload = {
            user          
        }
        
        await jwt.sign({user: user, role: 'user'}, jwtSecret, async (err, token) => {

            await res.cookie('jwt', `${token}`, { httpOnly: true })
             res.status(200).json(token)
        })



    } catch(error){
        console.log(error)
         res.status(500).json({message : "an error occured at login function"});
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
        
        const allUserRequests = await manageUsersAndWarehousesSchema.find({
            userEmail: decode.user.email
        })

        return res.send(allUserRequests).status(200)
    }
    catch(err){
        console.log(`err at getAllUserRequests => ${err.message}`)
    }
}


// resolve time conflict
const requestRentWarehouse = async (req, res) => {

    const warehouseInfo = req.body.warehouseInfo
    const warehouseOwnerDetails = req.body.warehouseOwner
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

            return res.send('rent').status(200)

        }

        return res.send('not availble').status(410)

    })
}

module.exports = {
    getWareHousesForUsers,
    userLogin,
    userRegister,
    requestRentWarehouse,
    getAllUserRequests
}

