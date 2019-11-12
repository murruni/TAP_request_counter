const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');
/**
 * retorna todos los usuarios * 
 */
router.get('/', user_controller.getAll);

/**
 * retorna el usuario _id x
 */
router.get('/:id', user_controller.get);

/**
 * crea o actualiza un user X con la cuota Y de registros que puede solicitar 
 * y la ventana de tiempo Z en que puede hacerlo
 *  200 ok
 *  400 mal formado
 *  401 si no tiene permisos para proceder
 * POST /users/X en el body { 'quota' : Y. 'seconds' : Z }
 */
router.post('/:id', user_controller.set);

module.exports = router;