const {register,login,logout,addWarehouses, getWarehouses, acceptDeclineRequest, deleteWarehouse, getRequests} = require('../controllers/wareHouseOwnerController')
const Router = require('express').Router;
const fs = require('fs')
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
warehouseOwnerRouter.get('/validateWarehouseOwner',validateWarehouseOwner);

// GET request for a list of all warehouseOwner
warehouseOwnerRouter.get('/', getWarehouses);
//validateWarehouseOwner


// DELETE request to delete a warehouseOwner
warehouseOwnerRouter.delete('/:id/delete', validateWarehouseOwner, deleteWarehouse);

warehouseOwnerRouter.post('/requests',  getRequests)
// validateWarehouseOwner,

warehouseOwnerRouter.post('/acceptDeclineRequest',validateWarehouseOwner, acceptDeclineRequest )


module.exports = warehouseOwnerRouter;