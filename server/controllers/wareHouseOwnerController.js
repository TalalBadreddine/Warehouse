const mongoose = require('mongoose');
const warehouseOwnerModel = require('../models/WarehouseOwner')

// const {generateToken} = require("../auth/auth.js");

//Register
const register = async (req, res) => {
    try {

        const {userName, email, password,phoneNumber} = req.body;

       

        try {
            
            const user = await warehouseOwner.create({
                userName, email, password, phoneNumber
            })

        }catch(e){
            // console.log(e.errors.password.properties.message)
            let errors = [];
            for(let key of Object.keys(e.errors)){
                let field = e.errors[key]
                errors.push(field.properties.message)
            }
            return res.status(400).json({message : errors})
        }

        if(user){
            res.status(201).json({message : "created warehouseOwner"});
        }else{
            res.status(400).json({message : "faild to create warehouseOwner"});
        }

    } catch(error){
        console.log(error)
        res.status(500).json({message : "an error occured!"});
    }
}

//Login
const login = async (req, res) => {
    try {

        const {email, password} = req.body;

        const user = await warehouseOwner.findOne({
            email
        })

        if(!user) return res.status(400).json({message : "user does not exist"});        

        // verify password
        // if((await user.validatePassword(password) == false)) 
        //     return res.status(403).json({message : "incorrect password!"})

        // create token
        const payload = {
            user          
        }

        // const token = generateToken(payload);

      
        // res.cookie('token', token, {httpOnly : false});
        return res.sendStatus(200)

    } catch(error){
        console.log(error)
        return res.status(500).json({message : "an error occured!"});
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
        return res.status(500).json({message : "an error occured!"});
    }
}

// POST request to add a warehouseowner
const addWarehouseOwner = async (req, res) => {
    try{
        const  warehouseOwner=req.body;
        const result = await warehouseOwnerModel.create(warehouseOwner);
        if(result){
            res.status(201).json({message:"added WareHouseOwner"})
           
        }else{
            res.status(409).json({message:"failed to add WareHouseOwner"})
        }
    
console.log(req.body)
    }catch(error){
        res.status(500).json({message:"internal error"})
    
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




module.exports = {register,login,logout,addWarehouseOwner,getWarehouseOwner,deleteWarehouseOwner}