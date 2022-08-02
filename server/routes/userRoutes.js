const router = require('express').Router
const userRouter = router()
const {
    validateUser
  } = require('../middleware/auth')

const {
    getWareHousesForUsers,
    userLogin,
    userRegister
} = require('../controllers/userController')


userRouter.get('/getWarehouses', validateUser, getWareHousesForUsers )

userRouter.post('/login', userLogin)

userRouter.post('/register', userRegister)

module.exports = {
    userRouter,
    userRegister,
    userLogin
}

