const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const courseRoutes = require('./routes/courseRoutes');
const trajectoryRoutes = require('./routes/trajectoryRoutes');



const app = express();

// Conexión DB
connectDB();


// Middlewares
app.use(cors());
app.use(express.json());

app.use('/api/courses', courseRoutes);
app.use('/api/trajectories', trajectoryRoutes);


// Ruta de salud
app.get('/', (req, res) => {
    res.send('API ProyectoM06 - Trayectorias funcionando');
});

// Servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
