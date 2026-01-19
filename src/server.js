const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const courseRoutes = require('./routes/courseRoutes');
const certificationRoutes = require('./routes/certificationRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Conexión DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/user', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/certifications', certificationRoutes);

// Ruta de salud
app.get('/', (req, res) => {
    res.send('API ProyectoM06 - Certificaciones funcionando');
});

// Servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
