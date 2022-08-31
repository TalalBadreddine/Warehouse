const mongoose = require('mongoose')

const contactAdmin = new mongoose.Schema({

    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    email: {
        type: String
    },

    phoneNumber:{
        type: String
    },

    subject: {
        type: String
    },
    content: {
        type: String
    }

})

module.exports = mongoose.model('contactAdmin', contactAdmin)