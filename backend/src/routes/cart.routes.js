const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const optionalAuth = require('../middleware/optionalAuth.middleware');

router.post('/add', optionalAuth, cartController.addToCart);
router.get('/', optionalAuth, cartController.getCart);
router.delete('/remove', optionalAuth, cartController.removeFromCart);

module.exports = router;
