const express = require('express');
const { connectDb } = require('./config/database');
const flightRoutes = require('./routes/flightRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


app.use(express.json());

connectDb();

app.use('/api/vuelos', flightRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
