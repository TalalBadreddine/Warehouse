const mongoose = require('mongoose')

const logsSchema = new mongoose.Schema({

    userID:{
        type: String
    },

    Action: {
        type: String
    },

    role:{
        type: String
    },
    
    Date: {
        type: String,
        default: new Date()
    }

})

module.exports = mongoose.model('logs', logsSchema)