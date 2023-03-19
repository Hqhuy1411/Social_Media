const router = require("express").Router();
const verifyUser = require('../middlewares/VerifyUser')
const postController = require('../app/controller/post.controller')
// create a post

router.post('/', verifyUser,postController.CreatePost )

router.put('/:id', verifyUser,postController.EditPost )

router.delete('/:id', verifyUser,postController.DetelePost)

// like and unlike post 
router.put('/:id/like', verifyUser,postController.ULike)

// get post

router.get('/:id', postController.GetPost)

// post of following
router.get('/timeline/all', verifyUser, postController.TimeLine)

module.exports = router
