const router = require("express").Router();
const Post = require("../app/model/Post");
const User = require("../app/model/User");
const verifyUser = require('../middlewares/VerifyUser')

// create a post

router.post('/', verifyUser, async (req, res) => {
    const { id } = req.user
    const newPost = new Post({
        ...req.body,
        userId: id,
    })
    try {
        const post = await newPost.save()
        res.status(200).send({
            data: post,
            success: true
        });
    } catch (error) {
        res.status(500).json(err);
    }
})

router.put('/:id', verifyUser, async (req, res) => {
    const { id } = req.user

    try {
        const post = await Post.findById(req.params.id)
        if (id == post.userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("the post has been updated");
        } else {
            res.status(403).json("You not host")
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

router.put('/:delete', verifyUser, async (req, res) => {
    const { id } = req.user
    try {
        const post = await Post.findById(req.params.id)
        if (id == post.userId) {
            await post.deleteOne()
            res.status(200).json("the post has been deleted");
        } else {
            res.status(403).json("You not host")
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

// like and unlike post 
router.put('/:id/like', verifyUser, async (req, res) => {
    const { id } = req.user
    try {
        const post = await Post.findById(req.params.id)
        if (!post.likes.includes(id)) {
            await post.updateOne({ $push: { likes: id } })
            res.status(200).json("The post has been liked");

        } else {
            await post.updateOne({ $pull: { likes: id } })
            res.status(200).json("The post has been unliked");

        }
    } catch (error) {
        res.status(500).json(error);
    }
})

// get post

router.get('/:id', async (req, res) => {
    let users = []
    try {
        const post = await Post.findById(req.params.id)
        await Promise.all(post.likes.map(async (userId) => {
            const user = await User.findById(userId)
            users.push(user)
        }))
        console.log(users)
        // OR
        // const users = await Promise.all(post.likes.map(async (userId) => {
        //     const user = await User.findById(userId);
        //     return user;
        //   }));
        res.status(200).json({ post: post, userlike: { ...users } });
    } catch (error) {
        res.status(500).json(error);

    }
})

// post of following
router.get('/timeline/all', verifyUser, async (req, res) => {
    const { id } = req.user
    try {
        const userCurrnet = await User.findById(id)
        const followingPost = await Promise.all(
            userCurrnet.followings.map(async (userId) => {
                return {
                    UserId : userId,
                    post :await Post.find({userId})
                }
            }))
            console.log(followingPost)
        res.status(200).json(followingPost)
    } catch (error) {
        res.status(500).json(error);

    }
})

module.exports = router
