const mongoose = require('mongoose');

const Message = new mongoose.Schema({
    name:String,
    email:String,
    subject:String,
    message:String,
    date:{
        type:Date,
        default:Date.now()
    }
});

const Message_Model = mongoose.model("Message",Message);
module.exports = Message_Model;