const mongoose = require('mongoose');
const warehouseOwnerModel = require('../models/WarehouseOwner');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv')
const jwtDecode = require('jwt-decode');
const manageUsersAndWarehousesSchema = require('../models/manageUsersAndWarehousesSchema');
const extensions = require('../helper/extensions')


dotenv.config({path: __dirname + '/../.env'})

const {
    hashType,
    encodeAs,
    jwtSecret
} = process.env



//Register
const register = async (req, res) => {
    try {

        const {userName, email, password,phoneNumber} = req.body;
        
            
            await warehouseOwnerModel.create({
                userName: userName,
                email: email,
                password: crypto.createHash(hashType).update(password).digest(encodeAs),
                phoneNumber: phoneNumber
            })

            return res.send('created').status(200)

    } catch(error){
        console.log(error)
        res.status(500).json({message : "an error occured at register function "});
    }
}

//Login
const login = async (req, res) => {
    try {

        const {email, password} = req.body;

        const user = await warehouseOwnerModel.findOne({
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

        jwt.sign({user: user, role: 'warehouseOwner'}, jwtSecret, async (err, token) => {

            res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 })
            return res.status(200).json(token)
        })



    } catch(error){
        console.log(error)
        return res.status(500).json({message : "an error occured at login function"});
    }
}

//logout
const logout = async (req, res) => {
    try {

        if(req.cookies.token){
            res.clearCookie("token");
            return res.sendStatus(200);
        }else{
            return res.sendStatus(400);
        }

    } catch(error){
        console.log(error)
        return res.status(500).json({message : "an error occured at logout function"});
    }
}

const getRequests = async (req, res) => {
    try{
        const userInfo = jwtDecode(req.cookies['jwt'])
        
        const results = await manageUsersAndWarehousesSchema.find({
            status:'pending',
            warehouseOwnerEmail: userInfo.user.email
        })

        return res.send(results).status(200)
    }
    catch(err){
        console.log(`error at getRequest function ${err.message}`)
    }
}

const acceptDeclineRequest = async (req, res) => {
    try{
        // const decodedInfo = jwtDecode(req.cookies['jwt'])
        const requestId = req.body.requestId
        let requestStatus =  req.body.status
        const warehouseId = req.body.warehouseId
        const requestedDate = req.body.requestedDate


        if(requestStatus == 'accepted'){
            await extensions.userRentAWarehouseInSpecificDate(warehouseId,requestedDate ).then( async (response) => {
                console.log(response)
                if(response){ requestStatus = 'accepted'}else{requestStatus = 'rejected'}

                await manageUsersAndWarehousesSchema.updateOne({
                    _id: requestId
                },{
                    $set:{
                        status: requestStatus
                    }
                }
                )
            })
        }
        console.log('done')
        return res.send('updated').status(200)
        
    }
    catch(err){
        console.log(`error at acceptDeclineRequest => ${err.message}`)
    }
}

// POST request to add a warehouseowner
const addWarehouseOwner = async (req, res) => {

    try{
        const  warehouseOwner = req.body;
        const result = await warehouseOwnerModel.create(warehouseOwner);
        if(result){
            res.status(201).json({message:"added WareHouseOwner"})
           
        }else{
            res.status(409).json({message:"failed to add WareHouseOwner"})
        }
    
    }catch(error){
        res.status(500).json({message:"error at addWarehouseOwner function"})
    
    }
}

// GET request for a list of all warehouseOwner
const getWarehouseOwner = async (req, res) => {
    try{
        const Email=req.query.Email
        const Password=req.query.Password;
        
        const filters ={}

        Email && (filters.Email=Email)
        Password && (filters.Password=Password)
        
    const warehouseOwner= await warehouseOwnerModel.find(filters);
    if (warehouseOwner){
        res.status(200).json(warehouseOwner);
    }}
    catch(error){
        res.status(500).json({message : "internal error"})

    }
    }


    // DELETE request to delete a WarehouseOwner
const deleteWarehouseOwner = async (req, res) => {warehouseOwnerModel.findByIdAndRemove(req.params.id, (err, data) => {
    if(!err) {
        // res.send(data);
        res.status(200).json({code: 200, message: 'WareHouseOwner deleted', deleteWarehouseOwner: data})
    } else {
        console.log(err);
    }
});
}




module.exports = {
    register,
    login,
    logout,
    getRequests,
    addWarehouseOwner,
    getWarehouseOwner,
    acceptDeclineRequest,
    deleteWarehouseOwner
}