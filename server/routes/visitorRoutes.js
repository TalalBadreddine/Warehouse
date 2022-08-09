const router = require('express').Router
 const visitorRouter = router()

 const {
     getWarehouses
 } = require('../controllers/visitorController')


 visitorRouter.get('/getWarehouses', getWarehouses)

 module.exports = {
     visitorRouter
 }