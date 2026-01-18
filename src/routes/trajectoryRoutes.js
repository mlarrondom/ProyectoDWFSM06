const express = require('express');
const router = express.Router();
const requirementRoutes = require('./requirementRoutes');


const {
    getAllTrajectories,
    getTrajectoryByCertCode,
    createTrajectory,
    updateTrajectory,
    deleteTrajectory,
} = require('../controllers/trajectoryController');

router.get('/', getAllTrajectories);
router.get('/:certCode', getTrajectoryByCertCode);
router.post('/', createTrajectory);
router.patch('/:certCode', updateTrajectory);
router.delete('/:certCode', deleteTrajectory);

// Rutas anidadas de requisitos
router.use('/:certCode/requirements', requirementRoutes);


module.exports = router;
