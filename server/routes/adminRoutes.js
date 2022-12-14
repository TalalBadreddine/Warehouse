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
    activeDeactiveCustomer,
    getUserRequests,
    getAllLogs,
    getAllCustomerAndOwnersAndLogs,
    getAllStatistics,
    getWarehouseOwnerAllRequests
} = require('../controllers/adminController')

adminRouter.post('/login', adminLogin)

adminRouter.get('/getAllCustomer',validateAdmin,  getAllCustomer )

adminRouter.post('/addCustomer',validateAdmin,  addCustomer )

adminRouter.delete('/deleteCustomer', validateAdmin, deleteCustomer )

adminRouter.put('/activeDeactiveCustomer',validateAdmin,  activeDeactiveCustomer )

adminRouter.get('/getCurrentCustomerInfo', validateAdmin, getCurrentCustomerInfo )

adminRouter.get('/getAllWarehouses', validateAdmin, getAllWarehouses )
adminRouter.post('/addWarehouse', validateAdmin, addWarehouse )
adminRouter.delete('/deleteWarehouse', validateAdmin, deleteWarehouse )

adminRouter.get('/getAllWarehouseOwners', validateAdmin, getAllWarehouseOwners )
adminRouter.post('/addWarehouseOwners', validateAdmin, addWarehouseOwners )
adminRouter.delete('/deleteWarehouseOwners', validateAdmin, deleteWarehouseOwners )

adminRouter.get('/getAllWarehousesPending', validateAdmin, getAllWarehousesPending)
adminRouter.post('/acceptRejectWarehouseRequest', validateAdmin, acceptRejectWarehouseRequest)
adminRouter.post('/getUserRequests',validateAdmin, getUserRequests)

adminRouter.get('/getAllLogs', validateAdmin, getAllLogs)

adminRouter.get('/getAllCustomerAndOwnersAndLogs', validateAdmin, getAllCustomerAndOwnersAndLogs)

adminRouter.get('/getAllStatistics', validateAdmin, getAllStatistics)
adminRouter.post('/getWarehouseOwnerAllRequests', validateAdmin, getWarehouseOwnerAllRequests)

module.exports = {adminRouter}

