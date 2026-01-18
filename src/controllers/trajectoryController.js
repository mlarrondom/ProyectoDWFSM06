const Trajectory = require('../models/Trajectory');
const { CAMPUSES, OWNER_UNITS } = require('../models/Trajectory');
const Requirement = require('../models/Requirement');


// GET /api/trajectories
const getAllTrajectories = async (req, res) => {
    try {
        const filter = req.allowedCampus
            ? { campus: req.allowedCampus }
            : {};

        const trajectories = await Trajectory.find(filter)
            .sort({ certCode: 1 })
            .select('certCode name campus ownerUnit');

        res.json({ trajectories });
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener trayectorias' });
    }
};

// GET /api/trajectories/:certCode
const getTrajectoryByCertCode = async (req, res) => {
    try {
        const certCode = Number(req.params.certCode);

        const trajectory = await Trajectory.findOne({ certCode });

        if (!trajectory) {
            return res.status(404).json({ msg: 'Trayectoria no encontrada' });
        }

        if (req.allowedCampus && trajectory.campus !== req.allowedCampus) {
            return res.status(403).json({ msg: 'No autorizado para esta trayectoria' });
        }

        res.json({ trajectory });
    } catch (error) {
        res.status(400).json({ msg: 'Código de certificación inválido' });
    }
};


// POST /api/trajectories
const createTrajectory = async (req, res) => {
    try {
        const { certCode, name, ownerUnit } = req.body;

        if (!certCode || !name || !ownerUnit) {
            return res.status(400).json({
                msg: 'Faltan campos obligatorios (certCode, name, ownerUnit)',
            });
        }

        if (!OWNER_UNITS.includes(ownerUnit)) {
            return res.status(400).json({
                msg: `ownerUnit inválido. Valores permitidos: ${OWNER_UNITS.join(' | ')}`,
            });
        }

        const exists = await Trajectory.findOne({ certCode });
        if (exists) {
            return res.status(409).json({ msg: 'certCode ya existe' });
        }

        // campus controlado por rol
        const campus = req.allowedCampus || req.body.campus;

        if (!campus || !CAMPUSES.includes(campus)) {
            return res.status(400).json({
                msg: `campus inválido. Valores permitidos: ${CAMPUSES.join(' | ')}`,
            });
        }

        const trajectory = await Trajectory.create({
            certCode,
            name,
            campus,
            ownerUnit,
        });

        return res.status(201).json({ trajectory });
    } catch (error) {
        return res.status(500).json({ msg: 'Error al crear trayectoria' });
    }
};


// PATCH /api/trajectories/:certCode
const updateTrajectory = async (req, res) => {
    try {
        const certCode = Number(req.params.certCode);
        const { name, campus, ownerUnit } = req.body;

        if (name === undefined && campus === undefined && ownerUnit === undefined) {
            return res.status(400).json({
                msg: 'Debes enviar al menos un campo a actualizar: name, campus u ownerUnit',
            });
        }

        const trajectory = await Trajectory.findOne({ certCode });
        if (!trajectory) {
            return res.status(404).json({ msg: 'Trayectoria no encontrada' });
        }

        if (req.allowedCampus && trajectory.campus !== req.allowedCampus) {
            return res.status(403).json({ msg: 'No autorizado para esta trayectoria' });
        }

        // campus solo lo puede cambiar admin
        if (campus !== undefined) {
            if (req.allowedCampus) {
                return res.status(403).json({
                    msg: 'No autorizado para modificar campus',
                });
            }

            if (!CAMPUSES.includes(campus)) {
                return res.status(400).json({
                    msg: `campus inválido. Valores permitidos: ${CAMPUSES.join(' | ')}`,
                });
            }

            trajectory.campus = campus;
        }

        if (ownerUnit !== undefined) {
            if (!OWNER_UNITS.includes(ownerUnit)) {
                return res.status(400).json({
                    msg: `ownerUnit inválido. Valores permitidos: ${OWNER_UNITS.join(' | ')}`,
                });
            }

            trajectory.ownerUnit = ownerUnit;
        }

        if (name !== undefined) {
            trajectory.name = String(name).trim();
        }

        await trajectory.save();

        return res.json({ msg: 'Trayectoria actualizada OK', trajectory });
    } catch (error) {
        return res.status(500).json({ msg: 'Error al actualizar trayectoria' });
    }
};


// DELETE /api/trajectories/:certCode
const deleteTrajectory = async (req, res) => {
    try {
        const certCode = Number(req.params.certCode);

        const trajectory = await Trajectory.findOne({ certCode });
        if (!trajectory) {
            return res.status(404).json({ msg: 'Trayectoria no encontrada' });
        }

        if (req.allowedCampus && trajectory.campus !== req.allowedCampus) {
            return res.status(403).json({ msg: 'No autorizado para esta trayectoria' });
        }

        const requirementsCount = await Requirement.countDocuments({
            trajectoryId: trajectory._id,
        });

        if (requirementsCount > 0) {
            return res.status(409).json({
                msg: 'No se puede eliminar la trayectoria porque tiene requisitos asociados',
            });
        }

        await Trajectory.deleteOne({ _id: trajectory._id });

        return res.json({
            msg: 'Trayectoria eliminada correctamente',
            certCode,
        });
    } catch (error) {
        console.error('deleteTrajectory ERROR:', error);
        return res.status(500).json({ msg: 'Error al eliminar trayectoria' });
    }
};


module.exports = {
    getAllTrajectories,
    getTrajectoryByCertCode,
    createTrajectory,
    updateTrajectory,
    deleteTrajectory,
};
