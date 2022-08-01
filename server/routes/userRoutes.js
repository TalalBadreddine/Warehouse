const router = require('express').Router
const userRouter = router()
const {
    getWareHousesForUsers,
    userLogin,
    userRegister
} = require('../controllers/userController')



userRouter.get('/getWarehouses', getWareHousesForUsers )

userRouter.post('/login', userLogin)

userRouter.post('/registerUser', userRegister)

module.exports = {
    userRouter,
    userRegister,
    userLogin
}

