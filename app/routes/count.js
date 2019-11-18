const express = require('express');
const router = express.Router();
const count_controller = require('../controllers/count');

router.get('/count/:cant', count_controller.count);

module.exports = router;