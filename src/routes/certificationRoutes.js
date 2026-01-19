const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const resolveCampus = require('../middlewares/resolveCampus');
const authorizeCertificationCampus = require('../middlewares/authorizeCertificationCampus');

const requirementRoutes = require('./requirementRoutes');

const {
    getAllCertifications,
    getCertificationByCertCode,
    createCertification,
    updateCertification,
    deleteCertification,
} = require('../controllers/certificationController');

// Seguridad base para todas las certificaciones
router.use(auth);
router.use(resolveCampus);

// Certificaciones (colección)
router.get('/', getAllCertifications);
router.post('/', createCertification);

// Certificción específica (por certCode)
router.get('/:certCode', authorizeCertificationCampus, getCertificationByCertCode);
router.delete('/:certCode', authorizeCertificationCampus, deleteCertification);
router.put('/:certCode', authorizeCertificationCampus, updateCertification);


// Rutas anidadas de requisitos (heredan auth + campus)
router.use('/:certCode/requirements', authorizeCertificationCampus, requirementRoutes);

module.exports = router;
