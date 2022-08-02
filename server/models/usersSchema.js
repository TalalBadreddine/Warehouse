const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({

    userName: String,
    email:String,
    password: String,
    registerDate:{
        type:Date,
        default: new Date()
    },
    isActive: {
        type: Boolean,
        default: true
    }

})

module.exports = mongoose.model('users', usersSchema)