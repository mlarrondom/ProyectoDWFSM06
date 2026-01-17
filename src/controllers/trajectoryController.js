const Trajectory = require('../models/Trajectory');
const { CAMPUSES, OWNER_UNITS } = require('../models/Trajectory');

// GET /api/trajectories
const getAllTrajectories = async (req, res) => {
    try {
        const trajectories = await Trajectory.find({})
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

        res.json({ trajectory });
    } catch (error) {
        res.status(400).json({ msg: 'Código de certificación inválido' });
    }
};


// POST /api/trajectories
const createTrajectory = async (req, res) => {
    try {
        const { certCode, name, campus, ownerUnit } = req.body;

        if (!certCode || !name || !campus || !ownerUnit) {
            return res.status(400).json({ msg: 'Faltan campos obligatorios (certCode, name, campus, ownerUnit)' });
        }

        if (!CAMPUSES.includes(campus)) {
            return res.status(400).json({
                msg: `campus inválido. Valores permitidos: ${CAMPUSES.join(' | ')}`,
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

        const trajectory = await Trajectory.create({ certCode, name, campus, ownerUnit });

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

        // 1) Debe venir al menos un campo
        if (name === undefined && campus === undefined && ownerUnit === undefined) {
            return res.status(400).json({
                msg: 'Debes enviar al menos un campo a actualizar: name, campus u ownerUnit',
            });
        }

        // 2) Validaciones por campo (solo si vienen)
        if (campus !== undefined && !CAMPUSES.includes(campus)) {
            return res.status(400).json({
                msg: `campus inválido. Valores permitidos: ${CAMPUSES.join(' | ')}`,
            });
        }

        if (ownerUnit !== undefined && !OWNER_UNITS.includes(ownerUnit)) {
            return res.status(400).json({
                msg: `ownerUnit inválido. Valores permitidos: ${OWNER_UNITS.join(' | ')}`,
            });
        }

        // 3) Buscar trayectoria
        const trajectory = await Trajectory.findOne({ certCode });
        if (!trajectory) {
            return res.status(404).json({ msg: 'Trayectoria no encontrada' });
        }

        // 4) Aplicar cambios
        if (name !== undefined) trajectory.name = String(name).trim();
        if (campus !== undefined) trajectory.campus = campus;
        if (ownerUnit !== undefined) trajectory.ownerUnit = ownerUnit;

        await trajectory.save();

        return res.json({ msg: 'Trayectoria actualizada OK', trajectory });
    } catch (error) {
        return res.status(500).json({ msg: 'Error al actualizar trayectoria' });
    }
};


module.exports = {
    getAllTrajectories,
    getTrajectoryByCertCode,
    createTrajectory,
    updateTrajectory,
};
