const usersSchema = require('../models/usersSchema');
const warehouseSchema = require('../models/warehouseSchema');
const warehouseOwnerSchema =require('../models/WarehouseOwner');
const getAllCustomer = (req, res) => {
    return res.send('getAllCustomer').status(200)
}

const addCustomer = async(req, res) => {
    // return res.send('addCustomer').status(200)
      try{

        
        const user=req.body;
        const alreadyExist = await usersSchema.find({email: user.email})
        if(alreadyExist.length >=1){
            return res.status(409).json({message:'User already exists'})
        }
        const result = await usersSchema.create(user);
        if(result){
            res.status(201).json({message:"added costumer"})
        }else{
            res.status(409).json({message:"failed to add costumer"})
        }
    
console.log(req.body)
    }catch(error){
        res.status(500).json({error})
    console.log(error);
    }
}

const deleteCustomer = async(req, res) => {
    // return res.send('deleteCustomer').status(200)
    try{
          const email = req.body.email
          await usersSchema.findOneAndDelete({email:email})
          res.status(200).json({message : "costumer deleted"})
    }
    catch(error){
        res.status(500).json({message :"internal error with fucntion delete customer"})

    }
  

    
}

const getCurrentCustomerInfo = (req, res) => {
    return res.send('getCurrentCustomerInfo').status(200)
}

// warehouses
const getAllWarehouses = (req, res) => {
    return res.send('getAllWarehouses').status(200)
}

const addWarehouse = async(req, res) => {
    // return res.send('addWarehouse').status(200)
      try{

        
        const warehouse=req.body;
        const alreadyExist = await warehouseSchema.find({name: warehouse.name, space:warehouse.space})
        if(alreadyExist.length >=1){
            return res.status(409).json({message:'warehouse already exists'})
        }
        const result = await warehouseSchema.create(warehouse);
        if(result){
            res.status(201).json({message:"added warehouse"})
        }else{
            res.status(409).json({message:"failed to add warehouse"})
        }
    
console.log(req.body)
    }catch(error){
        res.status(500).json({error})
    console.log(error);
    }
}

const  deleteWarehouse = async(req, res) => {
    // return res.send('deleteWarehouse').status(200)
      try{
          const _Id= req.body._Id
          await warehouseSchema.findOneAndDelete({_Id:_Id})
          res.status(200).json({message : "warehouse deleted"})
    }
    catch(error){
        res.status(500).json({message :"internal error with fucntion delete warehouse"})

    }
  
}

//warehouse owner
const  getAllWarehouseOwners = (req, res) => {
    return res.send('getAllWarehouseOwners').status(200)
}

const addWarehouseOwners = async(req, res) => {
    // return res.send('addWarehouseOwners').status(200)
       try{

        
        const warehouseOwner=req.body;
        const alreadyExist = await warehouseOwnerSchema.find({email: warehouseOwner.email})
        if(alreadyExist.length >=1){
            return res.status(409).json({message:'warehouseOwner already exists'})
        }
        const result = await warehouseOwnerSchema.create(warehouseOwner);
        if(result){
            res.status(201).json({message:"added warehouseOwner"})
        }else{
            res.status(409).json({message:"failed to add warehouseOwner"})
        }
    
console.log(req.body)
    }catch(error){
        res.status(500).json({error})
    console.log(error);
    }
}

const  deleteWarehouseOwners = async(req, res) => {
    // return res.send(' deleteWarehouseOwners').status(200)
     try{
          const email = req.body.email
          await warehouseOwnerSchema.findOneAndDelete({email:email})
          res.status(200).json({message : "warehouseOwner deleted"})
    }
    catch(error){
        res.status(500).json({message :"internal error with fucntion delete warehouseOwner"})

    }
}

module.exports = {
    getAllCustomer,
    addCustomer, 
    deleteCustomer, 
    getCurrentCustomerInfo,
    getAllWarehouses, 
    addWarehouse, 
    deleteWarehouse,
    getAllWarehouseOwners, 
    addWarehouseOwners, 
    deleteWarehouseOwners
}