const mongoose = require('mongoose')

const warehouseSchema = new mongoose.Schema({

    name:{
        type: String
    },
    space:{
        type: String
    },
    location:{
        type:[String]
    },
    datesAvailable:{
        type: [[String]]
    },
    type:{
        type: String
    },
    pricePerDay:{
        type: Number
    },
    description:{
        type: String
    },
    isFireSafe:{
        type: Boolean,
        default: false
    },
    isSecurityCameras:{
        type: Boolean,
        default: false
    },
    isAirConditioning:{
        type: Boolean,
        default: false
    },
    isWorkers:{
        type: Boolean,
        default: false
    },
    registerDate:{
        type: Date,
        default: new Date()
    },
    status:{
        type: String,
        // 3 type ( accepted, rejected, pending)
        default: 'pending'

    }

    
    
})

module.exports = mongoose.model('warehouse', warehouseSchema)