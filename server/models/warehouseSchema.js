const mongoose = require('mongoose')
const axios = require('axios')

const warehouseSchema = new mongoose.Schema({

    name:{
        type: String
    },
    space:{
        type: String
    },
    location:{
        type:[String]
    },
    datesAvailable:{
        type: [[String]]
    },
    type:{
        type: String
    },
    pricePerDay:{
        type: Number
    },
    description:{
        type: String
    },
    isFireSafe:{
        type: Boolean,
        default: false
    },
    isSecurityCameras:{
        type: Boolean,
        default: false
    },
    isAirConditioning:{
        type: Boolean,
        default: false
    },
    isWorkers:{
        type: Boolean,
        default: false
    },
    registerDate:{
        type: Date,
        default: new Date()
    },
    status:{
        type: String,
        // 3 type ( accepted, rejected, pending)
        default: 'pending'

    },
    address:{
        type: [[String]],
    }
})

warehouseSchema.address
warehouseSchema.pre('save', async function(next) {
    let location = this.location
    let x = location[0]
    let y = location[1]
    let countryAndCity 
    let fullLocation 

    await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${x}+${y}&key=6641773533da4005b39f03770e9c5b4c`).then((result) => {
        let data = result.data

        if(data.results.length <= 0 ){
            return this.address = 'No Location !!'
        }
  
        countryAndCity = [data.results[0].components.city ? data.results[0].components.city : data.results[0].components.state , data.results[0].components.country]
        
        fullLocation = data.results[0].formatted
        console.log(countryAndCity, fullLocation)
        this.address = [countryAndCity, fullLocation ]
        console.log(this.address)

    }).catch((err) => {
        console.log(` error in warehouseSchema => ${err.message}`)
    });
    next()
})

module.exports = mongoose.model('warehouse', warehouseSchema)