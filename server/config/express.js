const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')


dotenv.config({path: __dirname + '/../.env'})

const {
    dbPort,
    dbHost,
    dbName,
    serverPort
} = process.env

async function connectDB(){
    const uri = `mongodb+srv://Mayakhatib:mayush11@cluster0.l8gsdhz.mongodb.net/${dbName}`
    await mongoose.connect(uri)
    console.log("Connected to db!")
}

async function startServer(){
    try{
        await connectDB()

        // intialize express app
        const app = express()


        // Insert Routest here

        // app.use('/user',  userRouter )

        // app.use('/admin',  adminRouter)

        // app.use('/wareHouseOwner', wareHouseOwnerRouter )

        app.listen(serverPort, () => console.log(`Listening to port ${serverPort}`))

    }catch(error){
       
        console.log(`Error server connection with Db : ${error.message}`)
    }
}

startServer()