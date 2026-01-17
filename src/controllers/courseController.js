const Course = require('../models/Course');

// GET /api/courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({})
            .sort({ courseCode: 1 })
            .select('courseCode name credits');

        res.json({ courses });
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener cursos' });
    }
};

// GET /api/courses/:courseCode
const getCourseByCode = async (req, res) => {
    try {
        const { courseCode } = req.params;

        const course = await Course.findOne({ courseCode });

        if (!course) {
            return res.status(404).json({ msg: 'Curso no existe' });
        }

        res.json({ course });
    } catch (error) {
        res.status(400).json({ msg: 'Error al buscar curso' });
    }
};

module.exports = {
    getAllCourses,
    getCourseByCode,
};
