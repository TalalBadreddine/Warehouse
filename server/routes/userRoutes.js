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
    getAllUserRequests
} = require('../controllers/userController')


userRouter.get('/getWarehouses', validateUser, getWareHousesForUsers)

userRouter.post('/rentWarehouse', validateUser, requestRentWarehouse)

userRouter.get('/getAllUserRequests', validateUser, getAllUserRequests)

userRouter.post('/login', userLogin)

userRouter.post('/register', userRegister)

module.exports = {
    userRouter,
    userRegister,
    userLogin
}

