const express = require('express')
const User = require('../app/model/User')
const router = express.Router()
const verifyUser = require('../middlewares/VerifyUser')
const bcrypt = require('bcrypt')
router.get('/', verifyUser, async (req, res) => {
    const { id } = req.user
    console.log(id);
    const userCurrent = await User.findById(id).select('-password');
    res.status(200).json(userCurrent)
})

router.put('/:id', verifyUser, async (req, res) => {
    const { id } = req.user
    const userCurrent = await User.findById(id)
    if (id == req.params.id) {
        if (req.body.password) {
            const validPassword = await bcrypt.compare(req.body.password, userCurrent.password)
            console.log(validPassword)
            req.body.password = userCurrent.password
            if (validPassword == false) {
                res.status(400).json("wrong password")
            }

            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        }
    } else {
        return res.status(403).json("You can update only your account!");
    }
})

router.delete('/:id', verifyUser ,async (req,res)=>{
    const { id } = req.user
    const userCurrent = await User.findById(id)
    if (id == req.params.id) {
        if (req.body.password) {
            const validPassword = await bcrypt.compare(req.body.password, userCurrent.password)
            if (validPassword == false) {
                res.status(400).json("wrong password")
            }
           await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account has been deleted");
        }
    } else {
        return res.status(403).json("You can deleted only your account!");
    }
})


module.exports = router

