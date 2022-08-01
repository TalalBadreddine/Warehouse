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