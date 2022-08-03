const {register,login,logout,addWarehouseOwner, getWarehouseOwner, acceptDeclineRequest, deleteWarehouseOwner, getRequests} = require('../controllers/wareHouseOwnerController')
const Router = require('express').Router;

// initialize express router
const warehouseOwnerRouter = Router();

//REGISTER 
warehouseOwnerRouter.post('/register',register)

//LOGIN
warehouseOwnerRouter.post('/login',login)

//LOGOUT
warehouseOwnerRouter.get('/logout',logout)

// POST request to add a warehouseOwner
warehouseOwnerRouter.post('/add', addWarehouseOwner);

// GET request for a list of all warehouseOwner
warehouseOwnerRouter.get('/', getWarehouseOwner);


// DELETE request to delete a warehouseOwner
warehouseOwnerRouter.delete('/:id/delete', deleteWarehouseOwner);

warehouseOwnerRouter.get('/requests', getRequests)

warehouseOwnerRouter.post('/acceptDeclineRequest', acceptDeclineRequest )

module.exports = warehouseOwnerRouter;