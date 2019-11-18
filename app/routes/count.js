const express = require('express');
const router = express.Router();
const count_controller = require('../controllers/count');

router.get('/:cant', count_controller.count);

module.exports = router;