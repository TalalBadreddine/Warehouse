const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const warehouseOwnerRouter = require('../routes/wareHouseOwnerRoutes')
const {userRouter} = require('../routes/userRoutes')
const {adminRouter} = require('../routes/adminRoutes')
const {visitorRouter} = require('../routes/visitorRoutes')
const multer = require("multer");
const cors = require('cors')



dotenv.config({path: __dirname + '/../.env'})

const {
    dbPort,
    dbHost,
    dbName,
    serverPort
} = process.env


async function connectDB(){
  const uri = `mongodb://${dbHost}:${dbPort}/${dbName}`
    await mongoose.connect(uri)
    console.log("Connected to db!")
}

async function startServer(){
    try{
        await connectDB()

        // intialize express app
        const app = express()
 
         app.use(cors())
         
         app.use(express.json({limit: '50mb'}));
        
        app.use(cookieParser())


        // Insert Routest here

        app.use('/user',  userRouter )

        app.use('/admin',  adminRouter)

        app.use('/warehouseOwner', warehouseOwnerRouter )

        app.use('/visitor', visitorRouter)

        app.listen(serverPort, () => console.log(`Listening to port ${serverPort}`))

    }catch(error){
       
        console.log(`Error server connection with Db : ${error.message}`)
    }
}

startServer()