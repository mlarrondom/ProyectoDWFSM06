const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const resolveCampus = require('../middlewares/resolveCampus');
const authorizeTrajectoryCampus = require('../middlewares/authorizeTrajectoryCampus');

const requirementRoutes = require('./requirementRoutes');

const {
    getAllTrajectories,
    getTrajectoryByCertCode,
    createTrajectory,
    updateTrajectory,
    deleteTrajectory,
} = require('../controllers/trajectoryController');

// Seguridad base para todas las trayectorias
router.use(auth);
router.use(resolveCampus);

// Trayectorias (colección)
router.get('/', getAllTrajectories);
router.post('/', createTrajectory);

// Trayectoria específica (por certCode)
router.get('/:certCode', authorizeTrajectoryCampus, getTrajectoryByCertCode);
router.patch('/:certCode', authorizeTrajectoryCampus, updateTrajectory);
router.delete('/:certCode', authorizeTrajectoryCampus, deleteTrajectory);

// Rutas anidadas de requisitos (heredan auth + campus)
router.use('/:certCode/requirements', authorizeTrajectoryCampus, requirementRoutes);

module.exports = router;
