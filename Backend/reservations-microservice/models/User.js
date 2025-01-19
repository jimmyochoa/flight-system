const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    reservas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation'
    }]
});

module.exports = mongoose.model('User', userSchema);
