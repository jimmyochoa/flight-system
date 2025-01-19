const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');
const flightController = require('../controllers/flightController');

// Rutas de vuelos
router.get('/', verificarToken, flightController.buscarVuelos);
router.post('/', verificarToken, flightController.crearVuelo);
router.delete('/:id', verificarToken, flightController.eliminarVuelo);
router.put('/:id', verificarToken, flightController.actualizarVuelo);

module.exports = router;
