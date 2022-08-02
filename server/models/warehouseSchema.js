const mongoose = require('mongoose')

const warehouseSchema = new mongoose.Schema({

    name:{
        type: String
    },
    space:{
        type: String
    },
    location:{
        type:[Number]
    },
    datesAvailable:{
        type: [String]
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
        type: Boolean
    },
    isSecurityCameras:{
        type: Boolean
    },
    isAirConditioning:{
        type: Boolean
    },
    isWorkers:{
        type: Boolean
    },
    registerDate:{
        type: date,
        default: new Date()
    },
    status:{
        type: String,
        default:'pending'
        
    }

    
    
})

module.exports = mongoose.model('warehouse', warehouseSchema)