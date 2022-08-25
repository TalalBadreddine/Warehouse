const warehouseSchema = require('../models/warehouseSchema')
const userSchema = require('../models/usersSchema')
const WarehouseOwnerSchema = require('../models/WarehouseOwner')
const manageUsersAndWarehousesSchema = require('../models/manageUsersAndWarehousesSchema')


const getEveryWarehouseOwnerAndHisWareHouses = async () => {
    try{

        const results = await WarehouseOwnerSchema.find()

        let toReturn = []
        for(let i = 0 ; i < results.length ; i++){
            let currentWareHouseOwner = results[i]
            let currentWareHouseOwnerWarehousesArrayId = currentWareHouseOwner.myWarehouses
            let currentWareHouseOwnerArrayOfWarehouses = []

            for(let j = 0 ; j < currentWareHouseOwnerWarehousesArrayId.length ; j++){

                let warehouses  = await warehouseSchema.find({
                    _id: currentWareHouseOwnerWarehousesArrayId[j],
                    status: 'accepted'
                })
                
                if(warehouses.length > 0 ){
                    currentWareHouseOwnerArrayOfWarehouses.push(warehouses)
                }
            }

            let currentObj = {
                warehouseOwner: currentWareHouseOwner,
                warehouses: currentWareHouseOwnerArrayOfWarehouses
            }

            toReturn.push(currentObj)
        }
    
        return toReturn

    }
    catch(err){
        console.log(`error at getEveryWarehouseOwnerAndHisWareHouses, extentions => ${err.message}`)
    }

}

const getEveryWarehouseOwnerAndHisWareHousesPending = async () => {
    try{

        const results = await WarehouseOwnerSchema.find()

        let toReturn = []
        for(let i = 0 ; i < results.length ; i++){
            let currentWareHouseOwner = results[i]
            let currentWareHouseOwnerWarehousesArrayId = currentWareHouseOwner.myWarehouses
            let currentWareHouseOwnerArrayOfWarehouses = []

            for(let j = 0 ; j < currentWareHouseOwnerWarehousesArrayId.length ; j++){

                let warehouseResult = await warehouseSchema.find({
                    _id: currentWareHouseOwnerWarehousesArrayId[j],
                    status:'pending'
                })
                if(warehouseResult.length != 0 ){
                    currentWareHouseOwnerArrayOfWarehouses.push(warehouseResult)
                }
            }

            let currentObj = {
                warehouseOwner: currentWareHouseOwner,
                warehouses: currentWareHouseOwnerArrayOfWarehouses
            }

            toReturn.push(currentObj)
        }

        return toReturn

    }
    catch(err){
        console.log(`error at getEveryWarehouseOwnerAndHisWareHouses, extentions => ${err.message}`)
    }

}



//@params wareHouseTime is a array

const formatDate = (currentDate) => {
    let date = `${currentDate}`
    return date.split('T')[0]
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

const splitTimeByRequestedTime = (availbleTime, askedTime) => {
    try{

        const requestedStartDate = new Date(askedTime[0]);
        const requestedStartDateInSeconds = Math.floor(requestedStartDate.getTime() / 1000);


        const requestedEndDate = new Date(askedTime[1])
        const requestedEndDateInSeconds = Math.floor(requestedEndDate.getTime() / 1000);
        
        let wareHouseTime = availbleTime
        
        for(let i = 0 ; i < wareHouseTime.length ; i++){
           
            let startTime = new Date(wareHouseTime[i][0]); 
            let startTimeInSeconde = Math.floor(startTime.getTime() / 1000);

            let endTime = new Date(wareHouseTime[i][1])
            let endTimeInSeconde = Math.floor(endTime.getTime() / 1000);

            if(requestedStartDateInSeconds >= startTimeInSeconde && requestedEndDateInSeconds <= endTimeInSeconde){
        
                if(startTimeInSeconde == requestedStartDateInSeconds && requestedEndDateInSeconds != endTimeInSeconde){
                    
                    wareHouseTime[i] = [askedTime[1], wareHouseTime[i][1]]

                    return warehouseTime
                }

                if(requestedEndDateInSeconds == endTimeInSeconde && startTimeInSeconde != requestedStartDateInSeconds ){
                    wareHouseTime[i] = [wareHouseTime[i][0], askedTime[0]]


                    return warehouseTime
                }

                if(requestedEndDateInSeconds == endTimeInSeconde && startTimeInSeconde == requestedStartDateInSeconds ){

                    wareHouseTime = wareHouseTime.filter((element, index) => {
                        return index != i 
                    })

                    return warehouseTime
                }

                let firstHalfArr = [wareHouseTime[i][0], requestedStartDate ]
                let secondHalfArr = [requestedEndDate, wareHouseTime[i][1]]

                wareHouseTime = wareHouseTime.filter((element, index) => {
                    return index != i 
                })

                wareHouseTime.push(firstHalfArr)
                wareHouseTime.push(secondHalfArr)


                return warehouseTime
            }

        }

        return false

    }
    catch(err){
        console.log(`error at splitTimeByRequestedTime ${err.message}`)
    }
}

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

                let firstHalfArr = [wareHouseTime[i][0], requestedStartDate ]
                let secondHalfArr = [requestedEndDate, wareHouseTime[i][1]]

                wareHouseTime = wareHouseTime.filter((element, index) => {
                    return index != i 
                })

                wareHouseTime.push(firstHalfArr)
                wareHouseTime.push(secondHalfArr)

                await warehouseSchema.updateOne({
                    _id: wareHouseId
                },{
                    $set:{
                        datesAvailable: wareHouseTime
                    }
                })
                
                return true

            }

        }

        return false

    }
    catch(err){
        console.log(`error at userRentAWarehouseInSpecificDate time => ${askedTime} in extension => ${err.message}`)
    }
}

const getWarehousesAndNumberOfTimesRented = async () => {
    try{

        let map = new Map()

        const acceptedRequests = await manageUsersAndWarehousesSchema.find({
            status:'accepted'
        })
 
        for(let i =  0 ; i < acceptedRequests.length ; i++){
            if(map.has(acceptedRequests[i].WarehouseId)){

                map.set(acceptedRequests[i].WarehouseId,{
                    warehouseDetails: map.get(acceptedRequests[i].WarehouseId).warehouseDetails,
                    timesRented: map.get(acceptedRequests[i].WarehouseId).timesRented + 1  ,
                    profit: acceptedRequests[i].price + map.get(acceptedRequests[i].WarehouseId).profit,
                    owner: acceptedRequests[i].warehouseOwnerEmail
                } )

            }else{
                const results = await warehouseSchema.findOne({
                    _id: acceptedRequests[i].WarehouseId
                })

                map.set(acceptedRequests[i].WarehouseId, {
                    warehouseDetails: results,
                    timesRented: 1,
                    profit: acceptedRequests[i].price,
                    owner: acceptedRequests[i].warehouseOwnerEmail
                })

            }
        }

            let arr = []

            map.forEach((val, key) => {
                let obj ={}
                obj[key] = val
                arr.push(obj)
            })
   
            return arr

    }
    catch(err){
        console.log(`error at getWarehousesAndNumberOfTimesRented => ${err.message} in extension`)
    }
}


module.exports = {
    getEveryWarehouseOwnerAndHisWareHouses,
    checkIfTimeIsAvailbleWithWarehouseTime,
    userRentAWarehouseInSpecificDate,
    splitTimeByRequestedTime,
    formatDate,
    getEveryWarehouseOwnerAndHisWareHousesPending,
    getWarehousesAndNumberOfTimesRented
}
