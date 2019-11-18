const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user');
/**
 * retorna todos los usuarios * 
 */
router.get('/', user_controller.getAll);

/**
 * retorna el usuario _id x
 */
router.get('/:user', user_controller.get);

module.exports = router;