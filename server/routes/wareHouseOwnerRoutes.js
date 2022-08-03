const {register,login,logout,addWarehouse, getWarehouses, deleteWarehouse} = require('../controllers/wareHouseOwnerController')
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
warehouseOwnerRouter.post('/add', addWarehouse);

// GET request for a list of all warehouseOwner
warehouseOwnerRouter.get('/', getWarehouses);


// DELETE request to delete a warehouseOwner
warehouseOwnerRouter.delete('/:id/delete', deleteWarehouse);

module.exports = warehouseOwnerRouter;