const Trajectory = require('../models/Trajectory');

const authorizeTrajectoryCampus = async (req, res, next) => {
    try {
        if (req.allowedCampus === null) {
            return next();
        }

        const certCode = Number(req.params.certCode);
        if (Number.isNaN(certCode)) {
            return res.status(400).json({ msg: 'certCode inválido' });
        }

        const trajectory = await Trajectory.findOne({ certCode }).select('campus');
        if (!trajectory) {
            return res.status(404).json({ msg: 'Trayectoria no encontrada' });
        }

        if (trajectory.campus !== req.allowedCampus) {
            return res.status(403).json({ msg: 'No autorizado para esta trayectoria' });
        }

        next();
    } catch (error) {
        return res.status(400).json({ msg: 'Error al autorizar trayectoria' });
    }
};

module.exports = authorizeTrajectoryCampus;
