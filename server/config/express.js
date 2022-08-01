const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const warehouseOwnerRouter=require('../routes/wareHouseOwnerRoutes')

dotenv.config({path: __dirname + '/../.env'})

const {
    dbPort,
    dbHost,
    dbName,
    serverPort
} = process.env

async function connectDB(){
    const uri = `mongodb+srv://Job:Job123@cluster0.xnktc2x.mongodb.net/${dbName}`
    await mongoose.connect(uri)
    console.log("Connected to db!")
}

async function startServer(){
    try{
        await connectDB()

        // intialize express app
        const app = express()


        // Insert Routest here


        app.use('/warehouseOwner', warehouseOwnerRouter )

        app.listen(serverPort, () => console.log(`Listening to port ${serverPort}`))

    }catch(error){
       
        console.log(`Error server connection with Db : ${error.message}`)
    }
}

startServer()