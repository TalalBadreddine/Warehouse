const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({

    userName: String,
    email:String,
    password: String,
    registrationDate:{
        type:Date,
        default: new Date()
    },
    isActive: {
        type: Boolean,
        default: true
    },
    stripeAccountId:{
        type: String
    }

})

module.exports = mongoose.model('users', usersSchema)