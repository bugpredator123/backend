const Message = require('../models/message');

async function save(req, res) {
    try {
        let result = new Message(req.body);
        await result.save();
        res.status(200).send(result);
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}

async function getMessages(req,res){
    try{
        let data = await Message.find();
        res.status(200).send(data);
    }
    catch(err){
        res.status(500).send(err);
    }
}

module.exports.save = save;
module.exports.getMessages = getMessages;