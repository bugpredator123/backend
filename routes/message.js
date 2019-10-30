const express = require('express');
const router = express.Router();
const Message = require('../controllers/message');

router.route('/').get(Message.getMessages).post(Message.save);

module.exports = router;