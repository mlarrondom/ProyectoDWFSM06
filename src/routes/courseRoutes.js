const express = require('express');
const router = express.Router();

const {
    getAllCourses,
    getCourseByCode,
    createCourse,
    updateCourseByCode,
    deleteCourseByCode,
} = require('../controllers/courseController');

router.get('/', getAllCourses);
router.post('/', createCourse);
router.get('/:courseCode', getCourseByCode);
router.put('/:courseCode', updateCourseByCode);
router.delete('/:courseCode', deleteCourseByCode);

module.exports = router;
