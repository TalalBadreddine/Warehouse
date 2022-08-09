const {register,login,logout,addWarehouses, getWarehouses, acceptDeclineRequest, deleteWarehouse, getRequests} = require('../controllers/wareHouseOwnerController')
const Router = require('express').Router;
const {
    validateWarehouseOwner
  } = require('../middleware/auth')

  const multer=require('multer')

  const storage = multer.diskStorage({
      destination: function(req, file, cb){
        cb(null, './');
      } ,
    filename:(req,file,cb) => {
        cb(null,file.originalname)
    },
  })
  const upload=multer(({storage:storage}))

// initialize express router
const warehouseOwnerRouter = Router();

warehouseOwnerRouter.post('/image',upload.single('file'),function(req,res){
    res.json({})
})

//REGISTER 
warehouseOwnerRouter.post('/register',register)

//LOGIN
warehouseOwnerRouter.post('/login',login)

//LOGOUT
warehouseOwnerRouter.get('/logout', validateWarehouseOwner,logout)

// POST request to add a warehouseOwner

warehouseOwnerRouter.post('/add', validateWarehouseOwner ,addWarehouses);

//la yet2akad eno warehouseOwner l aam bfut 3a saf7a 
warehouseOwnerRouter.get('/validateWarehouseOwner',validateWarehouseOwner);

// GET request for a list of all warehouseOwner
warehouseOwnerRouter.get('/', validateWarehouseOwner, getWarehouses);


// DELETE request to delete a warehouseOwner
warehouseOwnerRouter.delete('/:id/delete', validateWarehouseOwner, deleteWarehouse);

warehouseOwnerRouter.post('/requests',  getRequests)
// validateWarehouseOwner,

warehouseOwnerRouter.post('/acceptDeclineRequest',validateWarehouseOwner, acceptDeclineRequest )


module.exports = warehouseOwnerRouter;