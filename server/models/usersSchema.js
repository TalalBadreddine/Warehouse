const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({

    userName: String,
    email:String,
    password: String,
    registerDate:Date,
    isActive: Boolean

})

module.exports = mongoose.model('users', usersSchema)