const express = require('express')
const User = require('../app/model/User')
const router = express.Router()
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.send('Hello Auth')

})

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })


        const user = await newUser.save()
        res.status(200).send({
            data: user,
            success: true
        });
    } catch (err) {
        res.status(500).json(err)
    }
})

// LOGIN
router.post("/login",async (req,res)=>{
    try {
        const user = await User.findOne({username : req.body.username})
        if(user== null){
            res.status(404).json("User not found")
        }
        const validPassword =await bcrypt.compare(req.body.password,user.password)
        if(validPassword== false){
            res.status(400).json("wrong password")
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }

})


module.exports = router

