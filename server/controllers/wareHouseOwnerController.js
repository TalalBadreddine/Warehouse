const mongoose = require('mongoose');
const warehouseOwnerModel = require('../models/WarehouseOwner');
const jwt = require('jsonwebtoken');
const warehouseSchema = require('../models/warehouseSchema');
const crypto = require('crypto');
const dotenv = require('dotenv')
const jwtDecode = require('jwt-decode');
const manageUsersAndWarehousesSchema = require('../models/manageUsersAndWarehousesSchema');
const extensions = require('../helper/extensions');


dotenv.config({ path: __dirname + '/../.env' })

const {
    hashType,
    encodeAs,
    jwtSecret,
    stripeSecretKey
} = process.env

const stripe = require('stripe')(`${stripeSecretKey}`);

//Register
const register = async (req, res) => {
    try {

        const { userName, email, password, phoneNumber, cardNumber, cardExpires, cardCode, cardName } = req.body;

        const alreadyExist = warehouseOwnerModel.find({
            email: email
        })

        if(alreadyExist.length > 0){
            return res.send('alreadyExist').status(403)
        }

        const account = await stripe.accounts.create({
            country: 'US',
            type: 'express',
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
            },
        });

        console.log(account)

        await warehouseOwnerModel.create({
            userName: userName,
            email: email,
            password: crypto.createHash(hashType).update(password).digest(encodeAs),
            phoneNumber: phoneNumber,
            cardNumber: cardNumber,
            cardExpires: cardExpires,
            cardCode: cardCode,
            cardName: cardName,
            stripeAccountId: account.id
        })

        const accountLink = await stripe.accountLinks.create({
            account: `${account.id}`,
            refresh_url: `http://localhost:3000/login`,
            return_url: 'http://localhost:3000/login',
            type: 'account_onboarding',
            collect: 'currently_due',
          });

          console.log(accountLink)

        return res.send(accountLink).status(200)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "an error occured at register function " });
    }
}

//Login
const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await warehouseOwnerModel.findOne({
            email
        })

        if (!user) return res.status(400).json({ message: "user does not exist" });

        // verify password
        if ((crypto.createHash(hashType).update(password).digest(encodeAs) != user.password))
            return res.status(403).json({ message: "incorrect password!" })

        // create token
        const payload = {
            user
        }

        await jwt.sign({ user: user, role: 'warehouseOwner' }, jwtSecret, async (err, token) => {

            await res.cookie('jwt', `${token}`, { httpOnly: true })
            res.status(200).json(token)
        })



    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "an error occured at login function" });
    }
}

//logout
const logout = async (req, res) => {
    try {

        if (req.cookies.token) {
            res.clearCookie("token");
            return res.sendStatus(200);
        } else {
            return res.sendStatus(400);
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "an error occured at logout function" });
    }
}

const getRequests = async (req, res) => {
    try {
        const userInfo = jwtDecode(req.cookies['jwt'])
        const results = await manageUsersAndWarehousesSchema.find({
            status: 'pending',
            warehouseOwnerEmail: userInfo.user.email
        })

        return res.send(results).status(200)
    }
    catch (err) {
        console.log(`error at getRequest function ${err.message}`)
    }
}

const acceptDeclineRequest = async (req, res) => {
    try {

        const requestId = req.body.requestId
        let requestStatus = req.body.status
        const warehouseId = req.body.warehouseId

        const results = await manageUsersAndWarehousesSchema.findOne({
            _id: requestId
        })

        const requestedDate = [results.startRentDate, results.endRentDate]
        let returnStatus = ''

        if (requestStatus == 'accepted') {

            await extensions.userRentAWarehouseInSpecificDate(warehouseId, requestedDate).then(async (response) => {
              
                if (response) { 
                    requestStatus = 'accepted'
                    returnStatus = 'accepted'

             } else { 
                 requestStatus = 'rejected'
                 returnStatus = 'rejected cause of time conflict'
                 }

                await manageUsersAndWarehousesSchema.updateOne({
                    _id: requestId
                }, {
                    $set: {
                        status: requestStatus
                    }
                }
                )
            })
            
        }else{

            returnStatus = 'rejected'
            await manageUsersAndWarehousesSchema.updateOne({
                _id: requestId
            }, {
                $set: {
                    status: 'rejected'
                }
            }
            )

        }

        return res.send(`updated request with id ${requestId} status to ${returnStatus}`).status(200)

    }
    catch (err) {
        console.log(`error at acceptDeclineRequest => ${err.message}`)
    }
}

// POST request to add a warehouseowner

const addWarehouses = async (req, res) => {

    try {
        const warehouse = req.body;
        const result = await warehouseSchema.create(warehouse);
        if (result) {
            res.status(201).json({ message: "added WareHouse" })


        } else {
            res.status(409).json({ message: "failed to add WareHouse" })
        }

    } catch (error) {
        res.status(500).json({ message: "error at addWarehouse function" })

    }
}

// GET request for a list of all warehouseOwner
const getWarehouses = async (req, res) => {
    try {

        const decodedInfo = jwtDecode(req.cookies['jwt'])
        let myWarehousese = []

        const owner = await warehouseOwnerModel.findOne({
            email: decodedInfo.user.email
        })

        for (let i = 0; i < owner.myWarehouses.length; i++) {

            let warehouse = await warehouseSchema.find({
                _id: owner.myWarehouses[i]
            })

            myWarehousese.push(warehouse[0])
        }

        return res.status(200).send(myWarehousese)
    }
    catch (error) {
        res.status(500).json({ message: "internal error with function get all warehouses" })

    }
}


// DELETE request to delete a WarehouseOwner
const deleteWarehouse = async (req, res) => {

    try {
        const _Id = req.body._Id
        await warehouseSchema.findOneAndDelete({ _Id: _Id })
        res.status(200).json({ message: "warehouse deleted" })
    }
    catch (error) {
        res.status(500).json({ message: "internal error with fucntion delete warehouse" })

    }

}

const getWarehouseDetails = async (req, res) => {
    try{

        const warehouseId = req.body.warehouseId

        const oldRequests = await manageUsersAndWarehousesSchema.find({
            WarehouseId: warehouseId,
            status: 'accepted'
        })

        const warehouseInfo = await warehouseSchema.find({
        _id: warehouseId
        })

        let object = {
            oldRequests:oldRequests,
            warehouseInfo: warehouseInfo
        }

        return res.send(object).status(200)

    }
    catch(err){
        console.log(`error at getWarehouseDetails in warehouseOwnerController ${err.message}`)
    }
}




module.exports = {
    register,
    login,
    logout,
    getRequests,
    addWarehouses,
    getWarehouses,
    acceptDeclineRequest,
    deleteWarehouse,
    getWarehouseDetails
}