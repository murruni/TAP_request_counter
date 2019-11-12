const express = require('express');
const router = express.Router();
const count_controller = require('../controllers/count_controller');

/**
 * comprueba que el usuario no haya superado la cuota de requests 
 * dentro de la ventana de tiempo
 *  200 si esta dentro de su cuota
 *  401 si alcanzo la cuota
 * GET  /count  
 */
router.get('/count', count_controller.count);

module.exports = router;