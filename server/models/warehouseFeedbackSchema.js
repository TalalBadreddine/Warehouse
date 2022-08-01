const mongoose = require('mongoose')

const warehouseFeedbackSchema = new mongoose.Schema({

    wareHouseId:{
        type: String
    },

    userId:{
        type: String
    },
    
    typeOfUser: {
        type: String,
        enum : ['user','warehouseOwner'],
    },

    isReply:{
        type: String,

    },

    content:{
        type: String
    }

})

module.exports = mongoose.model('warehouseFeedbackSchema', warehouseFeedbackSchema)