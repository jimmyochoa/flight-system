const Flight = require('../models/Flight');

exports.buscarVuelos = async (req, res) => {
    const { origen, destino, fecha, id } = req.query; // Asegúrate de obtener el id de req.query
    const condiciones = {};

    if (id) {
        try {
            const vuelo = await Flight.findById(id);
            if (vuelo) {
                return res.status(200).json(vuelo);
            } else {
                return res.status(404).json({
                    message: 'Vuelo no encontrado con el ID proporcionado.'
                });
            }
        } catch (error) {
            console.error('Error al buscar vuelo por ID:', error.message);
            return res.status(500).json({
                message: 'Error al buscar vuelo por ID.'
            });
        }
    } else {
        if (origen) condiciones.origen = origen;
        if (destino) condiciones.destino = destino;
        if (fecha) condiciones.fecha = { $gte: new Date(fecha) };

        try {
            const vuelos = await Flight.find(condiciones);
            if (vuelos.length > 0) {
                return res.status(200).json(vuelos);
            } else {
                return res.status(404).json({
                    message: 'No se encontraron vuelos con los criterios proporcionados.'
                });
            }
        } catch (error) {
            console.error('Error al buscar vuelos:', error.message);
            return res.status(500).json({
                message: 'Error en la búsqueda de vuelos'
            });
        }
    }
};


exports.crearVuelo = async (req, res) => {
    const { origen, destino, fecha, precio, asientosDisponibles } = req.body;

    if (!origen || !destino || !precio || !asientosDisponibles) {
        return res.status(400).json({
            message: 'Todos los campos son obligatorios.'
        });
    }

    try {
        const vueloExistente = await Flight.findOne({ origen, destino });
        if (vueloExistente) {
            return res.status(400).json({ message: 'Ya existe un vuelo con el mismo origen y destino.' });
        }

        const nuevoVuelo = new Flight({
            origen,
            destino,
            precio,
            asientosDisponibles
        });

        await nuevoVuelo.save();
        return res.status(201).json({ message: 'Vuelo creado con éxito', vuelo: nuevoVuelo });
    } catch (error) {
        console.error('Error al crear vuelo:', error.message);
        return res.status(500).json({ message: 'Error al crear el vuelo' });
    }
};

exports.eliminarVuelo = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Debe proporcionar un ID de vuelo.' });
    }

    try {
        const vuelo = await Flight.findById(id);
        if (!vuelo) {
            return res.status(404).json({ message: 'Vuelo no encontrado.' });
        }

        await Flight.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Vuelo eliminado con éxito.' });
    } catch (error) {
        console.error('Error al eliminar vuelo:', error.message);
        return res.status(500).json({ message: 'Error al eliminar el vuelo.' });
    }
};


exports.actualizarVuelo = async (req, res) => {
    const { id } = req.params;
    const { asientosDisponibles, precio, origen, destino, fecha } = req.body;

    if (asientosDisponibles !== undefined && asientosDisponibles < 0) {
        return res.status(400).json({ 
            message: 'El número de asientos disponibles no puede ser negativo.' 
        });
    }

    if (precio !== undefined && precio <= 0) {
        return res.status(400).json({ 
            message: 'El precio debe ser un valor positivo.' 
        });
    }

    try {
        const vuelo = await Flight.findById(id);
        if (!vuelo) {
            return res.status(404).json({ 
                message: 'Vuelo no encontrado.' 
            });
        }

        const vueloActualizado = await Flight.findByIdAndUpdate(
            id,
            {
                origen: origen !== undefined ? origen : vuelo.origen,
                destino: destino !== undefined ? destino : vuelo.destino,
                fecha: fecha !== undefined ? new Date(fecha) : vuelo.fecha,
                precio: precio !== undefined ? precio : vuelo.precio,
                asientosDisponibles: asientosDisponibles !== undefined ? asientosDisponibles : vuelo.asientosDisponibles
            },
            { new: true }
        );

        if (!vueloActualizado) {
            return res.status(500).json({ 
                message: 'Error al actualizar el vuelo.' 
            });
        }

        return res.status(200).json({ 
            message: 'Vuelo actualizado con éxito', vuelo: vueloActualizado 
        });
    } catch (error) {
        console.error('Error al actualizar vuelo:', error.message);
        return res.status(500).json({ 
            message: 'Error al actualizar el vuelo' 
        });
    }
};

