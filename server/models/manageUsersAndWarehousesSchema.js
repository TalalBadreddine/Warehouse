const mongoose = require('mongoose')

const manageUsersAndWarehousesSchema = new mongoose.Schema({

     userEmail:{
        type: String
    },
    WarehouseId:{
        type: String
    },
    startRentDate:{
        type: String
    },
    endRentDate:{
        type: String
    },
    price:{
        type: Number
    },
    warehouseName:{
        type: String
    },
    warehouseOwnerName:{
        type: String
    },
    warehouseOwnerEmail:{
        type: String
    },
    status:{
        type: String,
        //['pending','accepted','rejected']
        default: 'pending'
    }


    })



    module.exports = mongoose.model('manageUsersAndWarehouses', manageUsersAndWarehousesSchema)