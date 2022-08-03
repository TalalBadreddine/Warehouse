const mongoose = require('mongoose');
const warehouseOwnerModel = require('../models/WarehouseOwner');
const jwt = require('jsonwebtoken');
const warehouseSchema=require('../models/warehouseSchema');

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

        jwt.sign({user: user, role: 'warehouseOwner'}, jwtSecret, async (err, token) => {

            res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 })
            return res.status(200).json(token)
        })



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
const addWarehouse = async (req, res) => {
    try{
        const  warehouse=req.body;
        const result = await warehouseSchema.create(warehouse);
        if(result){
            res.status(201).json({message:"added WareHouse"})
           
        }else{
            res.status(409).json({message:"failed to add WareHouse"})
        }
    
console.log(req.body)
    }catch(error){
        res.status(500).json({message:"internal error"})
    
    }
}
// GET request for a list of all warehouseOwner
const getWarehouses = async (req, res) => {
    try{
     const warehouse= await warehouseSchema.find();
     if (warehouse){
          res.status(200).json(warehouse);
     }}
 catch(error){
     res.status(500).json({message : "internal error with function get all warehouses"})

 }
}



    // DELETE request to delete a WarehouseOwner
    const  deleteWarehouse = async(req, res) => {
      
          try{
              const _Id= req.body._Id
              await warehouseSchema.findOneAndDelete({_Id:_Id})
              res.status(200).json({message : "warehouse deleted"})
        }
        catch(error){
            res.status(500).json({message :"internal error with fucntion delete warehouse"})
    
        }
      
    }




module.exports = {register,login,logout,addWarehouse,getWarehouses,deleteWarehouse}