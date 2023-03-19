const express = require('express')
const router = express.Router()
const verifyUser = require('../middlewares/VerifyUser')
const userController = require('../app/controller/user.controler')


// Get a user
router.get('/', verifyUser,userController.GetUser)


// Edit a user
router.put('/:id', verifyUser,userController.EditUser )


// delete a user
router.delete('/:id', verifyUser, userController.DeleteUser)

// follow a user 
router.put('/:id/follow', verifyUser, userController.FollowUser)


// unfollow a user 
router.put('/:id/unfollow', verifyUser, userController.UnFollowUser)


module.exports = router

