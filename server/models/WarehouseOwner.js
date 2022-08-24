
const mongoose = require('mongoose')

const warehouseOwnerSchema = new mongoose.Schema({

    userName:
    {
        type:String
          
    },
    email:
    {
        type:String
          
    },
    password:
    {
        type:String
          
    },
    phoneNumber:
    {
        type:Number
        
    },
    cardNumber:{
        type:String

    },
    cardExpires:{
        type:String

    },
    cardCode:{
        type:String

    },
    cardName:{
        type:String
        
    },

    myWarehouses:
    {
        type: [String]
        
    },
    registerDate:
    {
        type:Date
        
    },
    isActive:
    {
        type:String
        
    },
    
    stripeAccountId:{
        type: String
    },

    registrationDate:{
        type: Date,
        default: new Date()
    }

})

module.exports = mongoose.model('warehouseOwner', warehouseOwnerSchema)