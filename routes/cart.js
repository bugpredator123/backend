const express = require('express');
const router = express.Router();
const Cart = require('../controllers/cart');

router.route('/').post(Cart.checkout).get(Cart.getProducts);
router.route('/:id').get(Cart.resendKey);
module.exports = router;