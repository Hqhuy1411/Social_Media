const express = require('express')
const User = require('../app/model/User')
const router = express.Router()
const verifyUser = require('../middlewares/VerifyUser')
router.get('/' , verifyUser ,async (req,res)=>{
    const {id} =  req.user
    console.log(id);
    const userCurrent = await User.findById(id).select('-password');
    res.status(200).json(userCurrent)
})

module.exports = router

