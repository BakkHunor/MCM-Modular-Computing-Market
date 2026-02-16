const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const optionalAuth = require('../middleware/optionalAuth.middleware');

router.post('/checkout', optionalAuth, orderController.checkout);


module.exports = router;
