const Reservation = require('../models/Reservation');
const User = require('../models/User');
const axios = require('axios');

exports.reservarVuelo = async (req, res) => {
    const { vueloId, usuarioId } = req.body;

    if (!vueloId || !usuarioId) {
        return res.status(400).json({
            message: 'vueloId y usuarioId son obligatorios'
        });
    }

    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    const bearerToken = token.split(' ')[1];

    try {
        const vuelo = await axios.get(
            `http://flights-service:3001/api/vuelos`,
            { 
                params: { id: vueloId },
                headers: { Authorization: `Bearer ${bearerToken}` }
            }
        );

        if (!vuelo.data) {
            return res.status(404).json({
                message: 'Vuelo no encontrado'
            });
        }

        const vueloSeleccionado = vuelo.data;

        if (typeof vueloSeleccionado.asientosDisponibles === 'undefined') {
            return res.status(500).json({
                message: 'El vuelo seleccionado no tiene información de asientos disponibles.'
            });
        }

        if (vueloSeleccionado.asientosDisponibles <= 0) {
            return res.status(400).json({
                message: 'No hay asientos disponibles en este vuelo'
            });
        }

        const reservaExistente = await Reservation.findOne({ vueloId, usuarioId });
        if (reservaExistente) {
            return res.status(400).json({
                message: 'Ya existe una reserva para este vuelo por el usuario'
            });
        }

        const nuevaReserva = new Reservation({ vueloId: vueloSeleccionado._id, usuarioId });
        await nuevaReserva.save();

        await axios.put(
            `http://flights-service:3001/api/vuelos/${vueloSeleccionado._id}`,
            { asientosDisponibles: vueloSeleccionado.asientosDisponibles - 1 },
            { headers: { Authorization: `Bearer ${bearerToken}` } }
        );

        const usuario = await User.findById(usuarioId);
        if (usuario) {
            usuario.reservas.push(nuevaReserva._id);
            await usuario.save();
        }

        return res.status(201).json({ message: 'Reserva creada con éxito', reserva: nuevaReserva });
    } catch (error) {
        console.error('Error al crear reserva:', error.message);
        return res.status(500).json({
            message: 'Error al crear la reserva',
            error: error.message
        });
    }
};

exports.cancelarReserva = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: 'Debe proporcionar un ID de reserva.'
        });
    }

    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    const bearerToken = token.split(' ')[1];

    try {
        const reserva = await Reservation.findById(id);
        if (!reserva) {
            return res.status(404).json({
                message: 'Reserva no encontrada.'
            });
        }

        const vuelo = await axios.get(
            `http://flights-service:3001/api/vuelos`,
            { 
                params: { id: reserva.vueloId },
                headers: { Authorization: `Bearer ${bearerToken}` }
            }
        );

        if (!vuelo.data) {
            return res.status(404).json({
                message: 'Vuelo asociado a la reserva no encontrado.'
            });
        }

        const vueloSeleccionado = vuelo.data;

        if (typeof vueloSeleccionado.asientosDisponibles === 'undefined') {
            return res.status(500).json({
                message: 'El vuelo no tiene información de asientos disponibles.'
            });
        }

        await Reservation.findByIdAndDelete(id);

        await axios.put(
            `http://flights-service:3001/api/vuelos/${vueloSeleccionado._id}`,
            { asientosDisponibles: vueloSeleccionado.asientosDisponibles + 1 },
            { headers: { Authorization: `Bearer ${bearerToken}` } }
        );

        const usuario = await User.findById(reserva.usuarioId);
        if (usuario) {
            usuario.reservas = usuario.reservas.filter(r => r.toString() !== id);
            await usuario.save();
        }

        return res.status(200).json({
            message: 'Reserva cancelada con éxito.'
        });
    } catch (error) {
        console.error('Error al cancelar reserva:', error.message);
        return res.status(500).json({
            message: 'Error al cancelar la reserva',
            error: error.message
        });
    }
};
