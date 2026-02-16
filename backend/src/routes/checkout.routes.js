const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkout.controller');
const optionalAuth = require('../middleware/optionalAuth.middleware');

router.post('/', optionalAuth, checkoutController.checkout);

module.exports = router;
