const jwt = require('jsonwebtoken');

const secret_key = "secret";
const verificarToken = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Acceso denegado, token no proporcionado.' });
    }

    try {
        const decoded = jwt.verify(token, secret_key);
        req.usuario = decoded;
        next();
    } catch (error) {
        console.error('Error al verificar el token:', error.message);
        return res.status(401).json({ message: 'Token no válido.' });
    }
};

module.exports = verificarToken;
