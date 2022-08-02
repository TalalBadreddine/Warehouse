const warehouseSchema = require('../models/warehouseSchema')
const userSchema = require('../models/usersSchema')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const dotenv = require('dotenv')

dotenv.config({path: __dirname + '/../.env'})

const {
    hashType,
    encodeAs,
    jwtSecret
} = process.env


const getWareHousesForUsers = async (req, res) => {
    try{

        const results = await warehouseSchema.find({
            status:'accepted'
        })
    
        return res.send(results).status(200)

    }
    catch(err){
        console.log(`error at getWareHousesForUsers => ${err.message}`)
    }

}

const userLogin = async (req, res) => {
    try{
        const userInfo = req.body
        
        const userFromDb = await userSchema.findOne({
            email: userInfo.email
        })
 
        if(!userFromDb){
            return res.send('Does not exist').status(404)
        }
        
        if(userFromDb.password != crypto.createHash(hashType).update(userInfo.password).digest(encodeAs)){
            return res.send('wrong password').status(403)
        }

        if(!userFromDb.isActive ){
            return res.send('Inactive').status(403)
        }


        jwt.sign({user: userInfo, role: 'user'}, jwtSecret, async (err, token) => {

            res.cookie('jwt', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 })
            return res.status(400).json(token)
        })

        // return res.send('somthing went wrong').status(400)

    }
    catch(err){
        console.log(`error at userLogin => ${err.message}`)
    }
}


const userRegister = async (req, res) => {
    try{

        const userInfo = req.body

        const usersWithSameEmail = await userSchema.find({
            email: userInfo.email
        })

        if(usersWithSameEmail.length >= 1 ) return res.send('exist').status(409)   // 409 => conflict

        let user = new userSchema({

            email: userInfo.email,
            password: crypto.createHash(hashType).update(userInfo.password).digest(encodeAs)

        })

        await user.save()

        return res.send('added').status(200)
    }
    catch(err){
        console.log(`err at userRegisterFunction => ${err.message}`)
    }
}

module.exports = {
    getWareHousesForUsers,
    userLogin,
    userRegister
}

