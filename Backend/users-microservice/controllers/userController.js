const User = require('../models/User');
const Reservation = require('../models/Reservation');

exports.getAllUsers = async (req, res) => {
    try {
        const usuarios = await User.find().populate('reservas');
        return res.status(200).json({ usuarios });
    } catch (error) {
        console.error('Error al obtener usuarios:', error.message);
        return res.status(500).json({ 
            message: 'Error al obtener los usuarios', error: error.message 
        });
    }
};

exports.getUserById = async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const usuario = await User.findById(usuarioId).populate('reservas');
        if (!usuario) {
            return res.status(404).json({ 
                message: 'Usuario no encontrado' 
            });
        }
        return res.status(200).json({ usuario });
    } catch (error) {
        console.error('Error al obtener usuario:', error.message);
        return res.status(500).json({ 
            message: 'Error al obtener el usuario', error: error.message 
        });
    }
};

exports.getUserReservations = async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const usuario = await User.findById(usuarioId).populate('reservas');
        if (!usuario) {
            return res.status(404).json({ 
                message: 'Usuario no encontrado' 
            });
        }
        return res.status(200).json({ 
            reservas: usuario.reservas 
        });
    } catch (error) {
        console.error('Error al obtener reservas del usuario:', error.message);
        return res.status(500).json({ 
            message: 'Error al obtener reservas', error: error.message 
        });
    }
};
