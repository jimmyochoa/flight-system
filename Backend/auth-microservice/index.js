const express = require('express');
const dotenv = require('dotenv');
const { connectDb } = require('./config/database');
const userRouter = require('./routes/userRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

connectDb();

app.use('/api/auth', userRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
