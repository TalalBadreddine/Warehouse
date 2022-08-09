const extensions = require('../helper/extensions')
 const warehouseSchema = require('../models/warehouseSchema')
 const axios = require('axios')


 const getWarehouses = async (req, res) => {
     try {
         const results = await warehouseSchema.find()
         return res.send(results).status(200)

     }
     catch (err) {
         console.log(`error at getWareHousesForUsers => ${err.message}`)
     }

 }

 module.exports = {
     getWarehouses
 }