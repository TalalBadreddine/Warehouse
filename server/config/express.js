const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const warehouseOwnerRouter = require('../routes/wareHouseOwnerRoutes')
const {userRouter} = require('../routes/userRoutes')
const {adminRouter} = require('../routes/adminRoutes')
const {visitorRouter} = require('../routes/visitorRoutes')
const logsSchema = require("../models/logsSchema");
const bodyParser = require('body-parser')
const multer = require("multer");
const cors = require('cors')
const jwtDecode = require('jwt-decode')
const contactAdminSchema = require('../models/contactAdmin')


dotenv.config({path: __dirname + '/../.env'})

const {
    dbPort,
    dbHost,
    dbName,
    serverPort
} = process.env


async function connectDB(){
  const uri = `mongodb+srv://talalbadreddine:Ta07762909@mycluster.bnshd.mongodb.net/warehouseProject `
  //mongodb://${dbHost}:${dbPort}/${dbName}
    await mongoose.connect(uri)
    console.log("Connected to db!")
}

async function startServer(){
    try{
        await connectDB()

        // intialize express app
        const app = express()

        app.use(cookieParser())

        app.use(cors({
            origin: '',
            credentials: true,
        }))
        app.use(bodyParser.json({limit: '50mb'}));
        app.use(express.json())
        app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));

        // Insert Routest here

        app.use('/user',  userRouter )

        app.use('/admin',  adminRouter)

        app.use('/warehouseOwner', warehouseOwnerRouter )

        app.use('/visitor', visitorRouter)

        app.use('/contactAdmin', async (req, res) => {
            try{
                const data = req.body
                const contact = await contactAdminSchema.create(data)

                await contact.save()
                
                return res.status(200)
            }
            catch(err){
                console.log(`error in express file at contactAdmin => ${err.message}`)
            }
        })

        app.use('/userActivity', async (req, res) => { 
            try{

                const decodedInfo = jwtDecode(req.cookies['jwt'])
                const userAction = req.body.action
                const role = req.body.role
                
                const logs = new logsSchema({
                    userId: decodedInfo.user._id,
                    email: decodedInfo.user.email,
                    action: userAction,
                    role: role
                })

                await logs.save()

                return res.send(logs).status(200)
            }
            catch(err){
                console.log(`error at express userActivity route ${err.message}`)
            }

        })

        app.use('/logout', (req, res) => {
            res.clearCookie('jwt')
            res.end()
        })

        app.listen(serverPort, () => console.log(`Listening to port ${serverPort}`))

    }catch(error){
       
        console.log(`Error server connection with Db : ${error.message}`)
    }
}

startServer()