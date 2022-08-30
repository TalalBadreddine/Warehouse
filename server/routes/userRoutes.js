const router = require('express').Router
const userRouter = router()
const {
    validateUser
  } = require('../middleware/auth')

const {
    getWareHousesForUsers,
    userLogin,
    userRegister,
    requestRentWarehouse,
    getAllUserRequests,
    testPayment,
    getWarehouseInfo,
    addComment,
    addReply,
} = require('../controllers/userController')


userRouter.get('/getWarehouses', validateUser, getWareHousesForUsers)

userRouter.post('/rentWarehouse', validateUser, requestRentWarehouse)

userRouter.get('/testPayment', testPayment)

userRouter.get('/getAllUserRequests', validateUser, getAllUserRequests)

userRouter.post('/login', userLogin)

userRouter.post('/register', userRegister)

userRouter.post('/addComment', validateUser, addComment)

userRouter.post('/addReply', validateUser, addReply)

userRouter.post('/getWarehouseInfo', validateUser, getWarehouseInfo)

userRouter.get('/checkUserValidation', validateUser, (req, res) => {
    return res.status(200).send(true)
})

module.exports = {
    userRouter,
    userRegister,
    userLogin
}

