const mongoose = require('mongoose')

const PostSchame = new mongoose.Schema({
    userId : {
        require : true,
        type : mongoose.Schema.Types.ObjectId,
        ref : 'UserSchame'
    },
    des : {
        type : String,
        max : 50
    },
    likes: {
        type: Array,
        default: [],
      },

},
    { timestamps: true }
)
module.exports = mongoose.model("Post" , PostSchame)