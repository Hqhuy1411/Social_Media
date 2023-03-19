const bcrypt = require('bcrypt')
const User = require('../model/User')

class UserController {
    async GetUser(req, res)  {
        const { id } = req.user
        const userCurrent = await User.findById(id).select('-password');
        res.status(200).json(userCurrent)
    }
    async EditUser(req, res) {
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
    }
    async DeleteUser(req, res) {
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
    }

    async FollowUser(req, res)  {
        const { id } = req.user
        if (id == req.body.id) {
            if (id != req.params.id) {
                try {
                    const userFollow = await User.findById(req.params.id)
                    const userCurrent = await User.findById(id)
                    
                    if(!userCurrent.followings.includes(req.params.id)){
                        // await userCurrent.updateOne({$push : {followings : req.params.id}})
                        // await userFollow.updateOne({$push : {followers : req.body.id}})
                        // or
                        userCurrent.followings.push( req.params.id)
                        userCurrent.save()
                        userFollow.followers.push( req.body.id)
                        userFollow.save()
                        res.status(200).json("You has followed")
                    }else{
                        res.status(403).json("you allready follow this user");
                    }
    
                } catch (error) {
                    res.status(500).json(err);
                }
            } else {
                return res.status(403).json("You cant follow yourself");
            }
        } else {
            return res.status(403).json("Not verify");
        }
    
    }
    async UnFollowUser(req, res)  {
        const { id } = req.user
        if (id == req.body.id) {
            if (id != req.params.id) {
                try {
                    const userUnfollow = await User.findById(req.params.id)
                    const userCurrent = await User.findById(id)
                    
                    if(userCurrent.followings.includes(req.params.id)){
                        // await userCurrent.updateOne({$pull : {followings : req.params.id}})
                        // await userUnfollow.updateOne({$pull : {followers : req.body.id}})
                        // or
                        userCurrent.followings.pull( req.params.id) 
                        userCurrent.save()
                        userUnfollow.followers.pull( req.body.id) 
                        userUnfollow.save()
    
                        res.status(200).json("You has unfollowed")
                    }else{
                        res.status(403).json("you allready unfollow this user");
                    }
    
                } catch (error) {
                    res.status(500).json(err);
                }
            } else {
                return res.status(403).json("You cant unfollow yourself");
            }
        } else {
            return res.status(403).json("Not verify");
        }
    
    }
}
module.exports = new UserController