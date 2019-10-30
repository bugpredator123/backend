const express = require('express');
const router = express.Router();
const Cart = require('../controllers/cart');

router.route('/').post(Cart.validate);
module.exports = router;