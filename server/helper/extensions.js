const warehouseSchema = require('../models/warehouseSchema')
const userSchema = require('../models/usersSchema')
const WarehouseOwnerSchema = require('../models/WarehouseOwner')


// TODO: test it
const getEveryWarehouseOwnerAndHisWareHouses = async (req, res) => {
    try{

        const results = await WarehouseOwnerSchema.find()

        let toReturn = []
        for(let i = 0 ; i < results.length ; i++){
            let currentWareHouseOwner = results[i]
            let currentWareHouseOwnerWarehousesArrayId = currentWareHouseOwner.myWarehouses
            let currentWareHouseOwnerArrayOfWarehouses = []

            for(let j = 0 ; j < currentWareHouseOwnerWarehousesArrayId.length ; j++){

                currentWareHouseOwnerArrayOfWarehouses.push( await warehouseSchema.find({
                    _id: currentWareHouseOwnerWarehousesArrayId[i]
                })
                )
            }

            let currentObj = {
                wareHouseOwner: currentWareHouseOwner,
                wareHouses: currentWareHouseOwner
            }

            toReturn.push(currentObj)
        }
    
        return res.send(toReturn).status(200)

    }
    catch(err){
        console.log(`error at getEveryWarehouseOwnerAndHisWareHouses, extentions => ${err.message}`)
    }

}


//@params wareHouseTime is a array

const formatDate = (currentDate) => {
    return currentDate.split('T')[0]
}

// @params date always Array()  @return bool
const checkIfTimeIsAvailbleWithWarehouseTime = async  (wareHouseTime, askedTime) => {

    try{
      
        const requestedStartDate = new Date(askedTime[0]);
        const requestedStartDateInSeconds = Math.floor(requestedStartDate.getTime() / 1000);


        const requestedEndDate = new Date(askedTime[1])
        const requestedEndDateInSeconds = Math.floor(requestedEndDate.getTime() / 1000);


        for(let i = 0 ; i < wareHouseTime.length ; i++){

            let startTime = new Date(wareHouseTime[i][0]); 
            let startTimeInSeconde = Math.floor(startTime.getTime() / 1000);

            let endTime = new Date(wareHouseTime[i][1])
            let endTimeInSeconde = Math.floor(endTime.getTime() / 1000);
           
            if(requestedStartDateInSeconds >= startTimeInSeconde && requestedEndDateInSeconds <= endTimeInSeconde){return true}

        }

        return false

    }
    catch(err){
        console.log(`error at checkIfTimeIsAvailbleWithWarehouseTime in extension => ${err.message}`)
    }
}

//TODO: test this function
const userRentAWarehouseInSpecificDate = async (wareHouseId, askedTime) => {

    try{

        let wareHouseTime = await warehouseSchema.findOne({
            _id: wareHouseId
        })

        wareHouseTime = wareHouseTime.datesAvailable

        const requestedStartDate = new Date(askedTime[0]);
        const requestedStartDateInSeconds = Math.floor(requestedStartDate.getTime() / 1000);


        const requestedEndDate = new Date(askedTime[1])
        const requestedEndDateInSeconds = Math.floor(requestedEndDate.getTime() / 1000);


        for(let i = 0 ; i < wareHouseTime.length ; i++){

            let startTime = new Date(wareHouseTime[i][0]); 
            let startTimeInSeconde = Math.floor(startTime.getTime() / 1000);

            let endTime = new Date(wareHouseTime[i][1])
            let endTimeInSeconde = Math.floor(endTime.getTime() / 1000);

            if(requestedStartDateInSeconds >= startTimeInSeconde && requestedEndDateInSeconds <= endTimeInSeconde){

                //["2022/08/02","2023/08/02"]
                //["2022/09/02", "2022/12/02"]
                //-------------------------------
                //["2022/08/02","2022/09/01"],["2022/12/02","2023/08/02"]


                //@startDate is equal to requestedStartDate
                if(startTimeInSeconde == requestedStartDateInSeconds && requestedEndDateInSeconds != endTimeInSeconde){
                    wareHouseTime[i] = [askedTime[1], wareHouseTime[i][1]]

                    await warehouseSchema.updateOne({
                        _id: wareHouseId
                    },{
                        $set:{
                            datesAvailable: wareHouseTime
                        }
                    })

                    return true

                }

                if(requestedEndDateInSeconds == endTimeInSeconde && startTimeInSeconde != requestedStartDateInSeconds ){
                    wareHouseTime[i] = [wareHouseTime[i][0], askedTime[0]]

                    await warehouseSchema.updateOne({
                        _id: wareHouseId
                    },{
                        $set:{
                            datesAvailable: wareHouseTime
                        }
                    })

                    return true
                }

                if(requestedEndDateInSeconds == endTimeInSeconde && startTimeInSeconde == requestedStartDateInSeconds ){

                    wareHouseTime = wareHouseTime.filter((element, index) => {
                        return index != i 
                    })

                    await warehouseSchema.updateOne({
                        _id: wareHouseId
                    },{
                        $set:{
                            datesAvailable: wareHouseTime
                        }
                    })

                    return true
                }

                wareHouseTime = wareHouseTime.filter((element, index) => {
                    return index != i 
                })

                wareHouseTime.push([startTime, wareHouseTime[i][0]])
                wareHouseTime.push([endTime, wareHouseTime[i][1]])

                return true

            }

        }

        return false

    }
    catch(err){
        console.log(`error at checkIfTimeIsAvailbleWithWarehouseTime in extension => ${err.message}`)
    }
}


module.exports = {
    getEveryWarehouseOwnerAndHisWareHouses,
    checkIfTimeIsAvailbleWithWarehouseTime,
    userRentAWarehouseInSpecificDate,
    formatDate
}
