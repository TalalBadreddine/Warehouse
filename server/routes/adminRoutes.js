const router = require('express').Router
const adminRouter = router()

const {
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
} = require('../controllers/adminController')

adminRouter.get('/getAllCustomer', getAllCustomer )
adminRouter.post('/addCustomer', addCustomer )
adminRouter.delete('/deleteCustomer', deleteCustomer )
adminRouter.get('/getCurrentCustomerInfo', getCurrentCustomerInfo )

adminRouter.get('/getAllWarehouses', getAllWarehouses )
adminRouter.post('/addWarehouse', addWarehouse )
adminRouter.delete('/deleteWarehouse', deleteWarehouse )

adminRouter.get('/getAllWarehouseOwners', getAllWarehouseOwners )
adminRouter.post('/addWarehouseOwners', addWarehouseOwners )
adminRouter.delete('/deleteWarehouseOwners', deleteWarehouseOwners )




module.exports = {adminRouter}

