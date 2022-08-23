const mongoose = require('mongoose')

const logsSchema = new mongoose.Schema({

    userId:{
        type: String
    },
    userName:{
        type: String
    },
    action: {
        type: String
    },

    role:{
        type: String
    },
    // customer, warehouseOwner
    date: {
        type: String,
        default: new Date()
    }

})

module.exports = mongoose.model('logs', logsSchema)