const extensions = require('../helper/extensions')

 const getWarehouses = async (req, res) => {
    try{

        await extensions.getEveryWarehouseOwnerAndHisWareHouses().then((results) => {
            return res.send(results).status(200)
        })

    }
    catch(err){
        console.log(`error at getWareHousesForUsers => ${err.message}`)
    }

 }

 module.exports = {
     getWarehouses
 }