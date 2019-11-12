const express = require('express');
const router = express.Router();

// users routes
router.use('/users', require('./user.route'));

// counts
router.use('/count', require('./count.route'));

module.exports = router;