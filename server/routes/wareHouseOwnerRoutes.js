const {addWarehouseOwner, getWarehouseOwner, deleteWarehouseOwner} = require('../controllers/wareHouseOwnerController')
const Router = require('express').Router;

// initialize express router
const warehouseOwnerRouter = Router();

// POST request to add a warehouseOwner
warehouseOwnerRouter.post('/add', addWarehouseOwner);

// GET request for a list of all warehouseOwner
warehouseOwnerRouter.get('/', getWarehouseOwner);


// DELETE request to delete a warehouseOwner
warehouseOwnerRouter.delete('/:id/delete', deleteWarehouseOwner);

module.exports = warehouseOwnerRouter;