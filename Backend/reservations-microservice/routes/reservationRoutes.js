const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const verificarToken = require('../middlewares/authMiddleware');

router.post('/',verificarToken, reservationController.reservarVuelo);
router.delete('/:id',verificarToken, reservationController.cancelarReserva);

module.exports = router;