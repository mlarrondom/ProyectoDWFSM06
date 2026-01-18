const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

const { register, update } = require('../controllers/userController');
const { login, verifyToken } = require('../controllers/authController');

// Públicos
router.post('/register', register);
router.post('/login', login);

// Protegidos (requieren token)
router.get('/verifytoken', auth, verifyToken);
router.put('/update', auth, update);

module.exports = router;
