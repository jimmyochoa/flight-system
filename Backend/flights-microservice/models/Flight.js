const mongoose = require('mongoose');

const vueloSchema = new mongoose.Schema({
    origen: {
        type: String,
        required: true
    },
    destino: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    asientosDisponibles: {
        type: Number,
        required: true
    }
});

const Flight = mongoose.model('Flight', vueloSchema);
module.exports = Flight;
