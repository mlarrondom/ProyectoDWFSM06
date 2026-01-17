const express = require('express');
const router = express.Router();

const {
    getAllCourses,
    getCourseByCode,
} = require('../controllers/courseController');

router.get('/', getAllCourses);
router.get('/:courseCode', getCourseByCode);

module.exports = router;
