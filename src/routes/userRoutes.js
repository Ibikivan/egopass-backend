const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizationMiddleware = require('../middlewares/autorizationMIddleware');

// User routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profil', authMiddleware, userController.profil);

// Spécilized users registration routes
router.post('/register-agent', authMiddleware, authorizationMiddleware(['ADMIN']), userController.registerAgentRVA);
router.post('/register-admin', authMiddleware, authorizationMiddleware(['SUPER_ADMIN']), userController.registerAdmin);
router.post('/register-super-admin', authMiddleware, authorizationMiddleware(['SUPER_ADMIN']), userController.registerSuperAdmin);

module.exports = router;
