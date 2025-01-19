const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    vueloId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight',
        required: true
    },
    usuarioId: {
        type: String,
        required: true
    },
    fechaReserva: {
        type: Date,
        default: Date.now
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);