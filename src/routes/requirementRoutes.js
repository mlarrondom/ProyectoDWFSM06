const express = require('express');
const router = express.Router({ mergeParams: true });

const {
    createRequirement,
    getRequirementsByTrajectory,
    replaceRequirementCourse,
    updateCreditsRequirement,
    deleteRequirement,
} = require('../controllers/requirementController');

router.post('/', createRequirement);
router.get('/', getRequirementsByTrajectory);
router.patch('/:requirementId', replaceRequirementCourse);
router.patch('/:requirementId/credits', updateCreditsRequirement);
router.delete('/:requirementId', deleteRequirement);


module.exports = router;
