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
        type: Date,
        default: new Date()
    },
    isApproved:{
        type: Boolean
    }

    
    
})

module.exports = mongoose.model('warehouse', warehouseSchema)