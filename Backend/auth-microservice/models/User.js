const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    correo: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    contraseña: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
