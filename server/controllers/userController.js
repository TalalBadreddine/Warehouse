
const getWareHousesForUsers = (req, res) => {
    return res.send('getAllWareHouses').status(200)
}

const userLogin = (req, res) => {
    return res.send('Login').status(200)
}

const userRegister = (req, res) => {
    return res.send('Register').status(200)
}

module.exports = {
    getWareHousesForUsers,
    userLogin,
    userRegister
}