const usersSchema = require("../models/usersSchema");
const manageUsersAndWarehousesSchema = require('../models/manageUsersAndWarehousesSchema')
const warehouseSchema = require('../models/warehouseSchema')
const warehouseOwnerSchema = require('../models/WarehouseOwner')

const getAllCustomer = async (req, res) => {
   
    try{
  
        const user= await usersSchema.find();
        if (user){
             res.status(200).json(user);
        }}
    catch(error){
        res.status(500).json({message : "internal error with function get all cutomers"})

    }
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

const getCurrentCustomerInfo = async (req, res) => {
    try{
        const currentUserId = req.body.userId
        
        const result = await manageUsersAndWarehousesSchema.find({
            userId :currentUserId
        })
        return res.send(result).status(200)

    }
    catch(error){
        res.status(500).json({message : "internal error with function get current customer"})
    }
}

// warehouses

// const currentWarehouse = req.body
// const {name, space, location, datesAvailable, type, pricePerDay, description, isFireSafe, isSecurityCameras, isAirConditioning, isWorkers } = currentWarehouse

// let warehouse = new warehouseSchema({
//     name: name,
//     space: space,
//     location: location,
//     datesAvailable: datesAvailable,
//     type: type,
//     pricePerDay: pricePerDay,
//     description: description,
//     isFireSafe: Boolean(isFireSafe),
//     isSecurityCameras: Boolean(isSecurityCameras),
//     isAirConditioning: Boolean(isAirConditioning),
//     isWorkers: Boolean(isWorkers)
    
// })
// await warehouse.save()
// return res.send('added')

const getAllWarehouses = async (req, res) => {
       try{
        const warehouse= await warehouseSchema.find();
        if (warehouse){
             res.status(200).json(warehouse);
        }}
    catch(error){
        res.status(500).json({message : "internal error with function get all warehouses"})

    }
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
const  getAllWarehouseOwners = async (req, res) => {
        try{
        const warehouseOwner= await warehouseOwnerSchema.find({
            status: "accepted"
        });
        if (warehouseOwner){
             res.status(200).json(warehouseOwner);
        }}
    catch(error){
        res.status(500).json({message : "internal error with function get all warehouse owners"})

    }
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


//warehouses with a pending status
const getAllWarehousesPending = async (req, res) => {

    try {

        const warehouse =  await warehouseSchema.find({status: 'pending'});
        return res.send(warehouse).status(200)
    } catch(error){
        res.status(500).json({message : "internal error with function getAllwarehousesPending"})
    }
}

//from pending to accepted or rejected warehouse 

const acceptRejectWarehouseRequest = async (req, res) => {
    try {

        const warehouseId =  req.body.warehouseId
        const status = req.body.status

        await warehouseSchema.updateOne( {_id:warehouseId} , { $set: {status: status} } ) 
        return res.status(200)

    } catch(error){
        res.status(500).json({message : "internal error with function acceptRejectWarehouseRequest"})
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
    deleteWarehouseOwners,
    getAllWarehousesPending,
    acceptRejectWarehouseRequest
}