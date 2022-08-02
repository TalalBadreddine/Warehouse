
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

const addCustomer = (req, res) => {
    return res.send('addCustomer').status(200)
}

const deleteCustomer = (req, res) => {
    return res.send('deleteCustomer').status(200)
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
const getAllWarehouses = (req, res) => {
       try{
        const warehouse= await warehouseSchema.find();
        if (warehouse){
             res.status(200).json(warehouse);
        }}
    catch(error){
        res.status(500).json({message : "internal error with function get all warehouses"})

    }
}

const addWarehouse = (req, res) => {
    return res.send('addWarehouse').status(200)
}

const  deleteWarehouse = (req, res) => {
    return res.send('deleteWarehouse').status(200)
}

//warehouse owner
const  getAllWarehouseOwners = (req, res) => {
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

const addWarehouseOwners = (req, res) => {
    return res.send('addWarehouseOwners').status(200)
}

const  deleteWarehouseOwners = (req, res) => {
    return res.send(' deleteWarehouseOwners').status(200)
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