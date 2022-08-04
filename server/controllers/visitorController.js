const extensions = require('../helper/extensions')
const warehouseSchema = require('../models/warehouseSchema')

const getWarehouses = async (req, res) => {
    try{
       
        let warehouse = new warehouseSchema({
            name: 'test'
        })

        await warehouse.save()
        return res.send('added')

    }
    catch(err){
        console.log(`error at getWareHousesForUsers => ${err.message}`)
    }

}

module.exports = {
    getWarehouses
}

