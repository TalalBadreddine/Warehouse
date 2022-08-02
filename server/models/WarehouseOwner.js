
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
        
    }

})

module.exports = mongoose.model('warehouseOwner', warehouseOwnerSchema)