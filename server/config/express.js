const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const warehouseOwnerRouter = require('../routes/wareHouseOwnerRoutes')
const {userRouter} = require('../routes/userRoutes')
const {adminRouter} = require('../routes/adminRoutes')
const {visitorRouter} = require('../routes/visitorRoutes')
const multer = require("multer");


dotenv.config({path: __dirname + '/../.env'})

const {
    dbPort,
    dbHost,
    dbName,
    serverPort
} = process.env

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

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
        var cors = require('cors')

 
         app.use(cors())
         
        app.use(express.json())
        
        app.use(express.json())
        
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