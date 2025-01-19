const express = require('express');
const { connectDb } = require('./config/database');
const userRoutes  = require('./routes/userRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


app.use(express.json());

connectDb();

app.use('/api/users', userRoutes );

const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
