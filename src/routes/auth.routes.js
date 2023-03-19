const express = require('express')
const router = express.Router()
const authController = require('../app/controller/auth.controler');


router.get('/', (req, res) => {
    res.send('Hello Auth')

})

// REGISTER
router.post('/register', authController.registerUser)

// LOGIN
router.post("/login",authController.login)


module.exports = router

