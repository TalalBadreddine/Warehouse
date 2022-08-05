const extensions = require('../helper/extensions')
const warehouseSchema = require('../models/warehouseSchema')
const axios = require('axios')


const getWarehouses = async (req, res) => {
    try {
        // const currentWarehouse = req.body
        // const { name, space, location, datesAvailable, type, pricePerDay, description, isFireSafe, isSecurityCameras, isAirConditioning, isWorkers } = currentWarehouse

        // let warehouse = new warehouseSchema({
        //     name: name,
        //     space: space,
        //     location: location,
        //     datesAvailable: datesAvailable,
        //     type: type,
        //     pricePerDay: pricePerDay,
        //     description: description,
        //     isFireSafe: Boolean(isFireSafe),
        //     isSecurityCameras: Boolean(isSecurityCameras),
        //     isAirConditioning: Boolean(isAirConditioning),
        //     isWorkers: Boolean(isWorkers)

        // })
        // await warehouse.save()
        // return res.send('added')
        
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

