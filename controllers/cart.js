const Cart = require('../models/cart');
const mail = require('../helper/mail');

function getProductKey() {
    let key = "";
    for (let i = 0; i < 6; i++) {
        key += Math.random().toString(36).replace('0.', '').slice(0, 4) + '-';
    }
    key += Math.random().toString(36).replace('0.', '').slice(0, 4);
    return key
}


async function checkout(req, res) {
    try {
        req.body['products'].forEach(async (product) => {
            let data = {
                'email': req.body['details']['email'],
                'name': req.body['details']['name'],
                'mac': req.body['details']['mac'],
                'product_key': getProductKey(),
                'product_name': product['title'],
                'product_id': product['id'],
                'product_price': product['price']
            };
            let item = new Cart(data);
            let result = await item.save();
            mail.send(result['email'],result["_id"],result['product_name'],result['product_key']);
        });
        res.status(200).send({'status':'done'});
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
}

async function getProducts(req, res) {
    try {
        let result = await Cart.aggregate([
            { $project: { 'mac': 0, 'product_key': 0 } },
            { $sort: { "date": 1 } }
        ]);
        res.status(200).send(result);
    }
    catch{
        console.log(error);
        res.status(500).send("Something went wrong");
    }
}

async function resendKey(req, res) {
    try {
        let result = await Cart.findOne({"_id":req.params.id},{"email":1,"product_key":1,"product_name":1,"product_key":1,"_id":1});
        let status = mail.send(result['email'],result["_id"],result['product_name'],result['product_key'])
        status.then(
            (resolve)=>res.status(200).send({'result':"done"}),
            (reject)=>res.status(400).send("Try Again")
        )
        // res.status(200).send({'result':"Key Sent"});
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
}

async function validate(req,res){
    try{
        console.log(req.body);
        let result = await Cart.findOne({"_id":req.body.serial,"product_key":req.body.key,"mac":req.body.mac});
        console.log(result);
        if(result){
            console.log(result)
            res.status(200).send({"status":"valid"});
        }
        else{
            res.status(400).send({"status":"invalid"});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send({"status":"Internal Server Error"});
    }
}

module.exports.checkout = checkout;
module.exports.getProducts = getProducts;
module.exports.resendKey = resendKey;
module.exports.validate = validate;