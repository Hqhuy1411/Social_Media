const authRouter = require('./auth.routes')
const userRouter = require('./user.routes')
const postRouter = require('./post.routes')

function route(app){

    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use('/post', postRouter)
}

module.exports = route