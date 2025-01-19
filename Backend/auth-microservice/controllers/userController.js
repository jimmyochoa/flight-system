const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret_key = "secret";
exports.registro = async (req,res) => {
    try {
        const {correo,nombre,contraseña} = req.body;

        if(!correo || !nombre || !contraseña) {
            return res.status(400).json({
                message: "Porfavor ingresa todos los campos!"
            });
        }

        const usuarioExistente = await User.findOne({correo});
        if(usuarioExistente) {
            return res.status(400).json({
                message: "El usuario ya existe!"
            });
        }

        const HashContraseña = await bcrypt.hash(contraseña, 10);

        const usuarioNuevo = new User({
            correo,
            nombre,
            contraseña: HashContraseña
        });

        await usuarioNuevo.save();

        return res.status(201).json({
            message: "Usuario creado exitosamente!"
        });


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Error al crear el usuario!"
        });
    }
};

exports.login = async(req, res) => {
    try {
        const{correo, contraseña} = req.body;

        if(!correo || !contraseña) {
            return res.status(400).json({
                message: "Porfavor ingresa todos los campos!"
            });
        }

        const Usuario = await User.findOne({correo});
        if(!Usuario) {
            return res.status(401).json({
                message: "Usuario o contraseña inválidos"
            });
        }

        const verificacionContraseña = await bcrypt.compare(contraseña, Usuario.contraseña);
        if(!verificacionContraseña) {
            return res.status(401).json({
                message: "Usuario o contraseña inválidos"
            });
        }

        const token = jwt.sign(
            {userId: Usuario._id, correo: Usuario.correo},
            secret_key,
            {expiresIn: '1h'}
        );
        
        return res.status(200).json({
            message: "Usuario autenticado exitosamente!",
            jwt: token
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ 
            message: "Error al iniciar sesión" 
        });
    }
}