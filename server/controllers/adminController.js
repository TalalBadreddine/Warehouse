const warehouseSchema = require("../models/warehouseSchema")

const getAllCustomer = (req, res) => {
    return res.send('getAllCustomer').status(200)
}

const addCustomer = (req, res) => {
    return res.send('addCustomer').status(200)
}

const deleteCustomer = (req, res) => {
    return res.send('deleteCustomer').status(200)
}

const getCurrentCustomerInfo = (req, res) => {
    return res.send('getCurrentCustomerInfo').status(200)
}

// warehouses
const getAllWarehouses = (req, res) => {
    return res.send('getAllWarehouses').status(200)
}

const addWarehouse = (req, res) => {
    return res.send('addWarehouse').status(200)
}

const  deleteWarehouse = (req, res) => {
    return res.send('deleteWarehouse').status(200)
}

//warehouse owner
const  getAllWarehouseOwners = (req, res) => {
    return res.send('getAllWarehouseOwners').status(200)
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