const express = require('express')
const dotenv = require('dotenv')


dotenv.config({path: __dirname + '/../../.env'})

const {
    dbPort,
    dbHost,
    dbName
} = process.env

async function connectDB(){
    const uri = ``
    await mongoose.connect(uri)
    console.log("Connected to db!")
}
