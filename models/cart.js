const mongoose = require('mongoose');

const Cart = new mongoose.Schema({
    email: {
        type: String,
    },
    name: {
        type: String
    },
    mac:{
        type:String
    },
    product_key: {
        type: String
    },
    product_name:{
        type:String
    },
    product_id:{
        type:String
    },
    product_price:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

const Cart_Model = mongoose.model("Cart", Cart);
module.exports = Cart_Model;