const mongoose = require('mongoose')

const logsSchema = new mongoose.Schema({

    userID: String,
    Action:String,
    Date:Date

})

module.exports = mongoose.model('logs', logsSchema)