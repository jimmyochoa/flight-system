const express = require('express');
const { connectDb } = require('./config/database');
const reservationRoutes  = require('./routes/reservationRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


app.use(express.json());

connectDb();

app.use('/api/reservas', reservationRoutes );

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
