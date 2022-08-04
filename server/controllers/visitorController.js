const extensions = require('../helper/extensions')
const warehouseSchema = require('../models/warehouseSchema')
const axios = require('axios')


const getWarehouses = async (req, res) => {
    try{
        // const results = await warehouseSchema.find()

        const results = await axios.get('https://api.opencagedata.com/geocode/v1/json?q=33.377190+35.483590&key=6641773533da4005b39f03770e9c5b4c')

        console.log(results.data)
        return res.send(results.data).status(200)

    }
    catch(err){
        console.log(`error at getWareHousesForUsers => ${err.message}`)
    }

}

module.exports = {
    getWarehouses
}

