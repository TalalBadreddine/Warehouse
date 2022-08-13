const router = require('express').Router
const adminRouter = router()
const {
    validateAdmin
  } = require('../middleware/auth')


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
    deleteWarehouseOwners,
    getAllWarehousesPending,
    acceptRejectWarehouseRequest,
    adminLogin,
    activeDeactiveCustomer
} = require('../controllers/adminController')

adminRouter.post('/login', adminLogin)

adminRouter.get('/getAllCustomer', getAllCustomer )
// validateAdmin, 
adminRouter.post('/addCustomer',  addCustomer )
// validateAdmin,
adminRouter.delete('/deleteCustomer',  deleteCustomer )
// validateAdmin,
adminRouter.put('/activeDeactiveCustomer',  activeDeactiveCustomer )
// validateAdmin,
adminRouter.get('/getCurrentCustomerInfo', validateAdmin, getCurrentCustomerInfo )

adminRouter.get('/getAllWarehouses', validateAdmin, getAllWarehouses )
adminRouter.post('/addWarehouse', validateAdmin, addWarehouse )
adminRouter.delete('/deleteWarehouse', validateAdmin, deleteWarehouse )

adminRouter.get('/getAllWarehouseOwners', validateAdmin, getAllWarehouseOwners )
adminRouter.post('/addWarehouseOwners', validateAdmin, addWarehouseOwners )
adminRouter.delete('/deleteWarehouseOwners', validateAdmin, deleteWarehouseOwners )

adminRouter.get('/getAllWarehousesPending', validateAdmin, getAllWarehousesPending)
adminRouter.post('/acceptRejectWarehouseRequest', validateAdmin, acceptRejectWarehouseRequest)

module.exports = {adminRouter}

