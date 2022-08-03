const {register,login,logout,addWarehouseOwner, getWarehouseOwner, acceptDeclineRequest, deleteWarehouseOwner, getRequests} = require('../controllers/wareHouseOwnerController')
const Router = require('express').Router;
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

warehouseOwnerRouter.post('/add', validateWarehouseOwner, addWarehouseOwner);

// GET request for a list of all warehouseOwner
warehouseOwnerRouter.get('/', validateWarehouseOwner, getWarehouseOwner);


// DELETE request to delete a warehouseOwner
warehouseOwnerRouter.delete('/:id/delete', validateWarehouseOwner, deleteWarehouseOwner);

warehouseOwnerRouter.get('/requests', validateWarehouseOwner, getRequests)

warehouseOwnerRouter.post('/acceptDeclineRequest', validateWarehouseOwner, acceptDeclineRequest )

module.exports = warehouseOwnerRouter;