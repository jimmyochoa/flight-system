const mongoose = require('mongoose');

exports.connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conexion a la base establecida!');
    } catch (error) {
        console.error("Error en la conexion:", error.message);
    }
};