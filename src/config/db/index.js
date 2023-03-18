const mongoose  = require('mongoose')

async function connect(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/Media_Social');
        console.log("Connect Success")
    }catch(err){
        console.log("connect failure" + err)
    }
}

module.exports = {connect}