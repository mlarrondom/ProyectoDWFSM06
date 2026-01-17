const express = require('express');
const router = express.Router();
const requirementRoutes = require('./requirementRoutes');


const {
    getAllTrajectories,
    getTrajectoryByCertCode,
    createTrajectory,
    updateTrajectory,
} = require('../controllers/trajectoryController');

router.get('/', getAllTrajectories);
router.get('/:certCode', getTrajectoryByCertCode);
router.post('/', createTrajectory);
router.patch('/:certCode', updateTrajectory);
router.use('/:certCode/requirements', requirementRoutes);


module.exports = router;
