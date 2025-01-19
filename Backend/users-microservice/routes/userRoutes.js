const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verificarToken = require('../middlewares/authMiddleware');

router.get('/',verificarToken, userController.getAllUsers);

router.get('/:usuarioId',verificarToken, userController.getUserById);

router.get('/:usuarioId/reservas',verificarToken, userController.getUserReservations);

module.exports = router;

