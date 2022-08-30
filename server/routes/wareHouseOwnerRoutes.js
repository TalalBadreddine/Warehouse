const {register, login, addComment, getProfileModalInfo, completeStripeAccount, logout, addWarehouses, getWarehouses, acceptDeclineRequest, deleteWarehouse, getRequests, getWarehouseDetails} = require('../controllers/wareHouseOwnerController')
const Router = require('express').Router;
const jwtDecode = require('jwt-decode')
const {
    validateWarehouseOwner
  } = require('../middleware/auth')


// initialize express router
const warehouseOwnerRouter = Router();



//REGISTER 
warehouseOwnerRouter.post('/register',register)

//LOGIN
warehouseOwnerRouter.post('/login',login)

//LOGOUT
warehouseOwnerRouter.get('/logout', validateWarehouseOwner,logout)

// POST request to add a warehouseOwner

warehouseOwnerRouter.post('/add', addWarehouses);

//la yet2akad eno warehouseOwner l aam bfut 3a saf7a 
warehouseOwnerRouter.get('/validateWarehouseOwner',validateWarehouseOwner, (req, res) => {
  return res.send(true)
});

// GET request for a list of all warehouseOwner
warehouseOwnerRouter.get('/', validateWarehouseOwner ,getWarehouses);


// DELETE request to delete a warehouseOwner
warehouseOwnerRouter.delete('/:id/delete', validateWarehouseOwner, deleteWarehouse);

warehouseOwnerRouter.post('/getWarehouseDetails', validateWarehouseOwner, getWarehouseDetails)

warehouseOwnerRouter.post('/requests', validateWarehouseOwner,getRequests)

warehouseOwnerRouter.post('/acceptDeclineRequest',validateWarehouseOwner, acceptDeclineRequest )

warehouseOwnerRouter.post('/completeStripeAccount', completeStripeAccount)

warehouseOwnerRouter.post('/addComment', validateWarehouseOwner, addComment)

warehouseOwnerRouter.post('/profileModal', validateWarehouseOwner, getProfileModalInfo)


module.exports = warehouseOwnerRouter;