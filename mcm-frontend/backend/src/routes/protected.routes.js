const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Védett adat',
    user: req.user
  });
});

module.exports = router;
