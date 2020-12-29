const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        
    },
    phone:{
        type:Number,
        required:true,
        maxlength:10
    }, 
    text:{
        type:String,
        required: true
    }
}, {timestamps:true})

module.exports = new mongoose.model("Message", messageSchema);