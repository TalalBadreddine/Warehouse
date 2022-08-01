const mongoose = require('mongoose')

const manageUsersAndWarehousesSchema = new mongoose.Schema({

     userId:{
        type: String
    },
    WarehouseId:{
        type: String
    },
    startRentDate:{
        type: Date
    },
    endRentDate:{
        type: Date
    },
    price:{
        type: Number
    },
    warehouseName:{
        type: String
    },
    warehouseOwnerName:{
        type: String
    }


    })



    module.exports = mongoose.model('manageUsersAndWarehouses', manageUsersAndWarehousesSchema)