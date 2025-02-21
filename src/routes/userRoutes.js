const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizationMiddleware = require('../middlewares/autorizationMIddleware');
const authController = require('../controllers/authController');

dotenv.config();

// User routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profil', authMiddleware, userController.profil);
router.patch('/update', authMiddleware, userController.update);
router.get('/logout', authMiddleware, authController.logout);

// Change password handleling route
router.post('/request-reset-password', authController.requestPasswordReset);
router.post('/verify-reset-code', authController.verifyCode);
router.post('/reset-password', authController.resetPassword);

// Spécilized users registration routes
router.post('/register-agent', authMiddleware, authorizationMiddleware([process.env.ROLE_ADMIN]), userController.registerAgentRVA);
router.post('/register-admin', authMiddleware, authorizationMiddleware([process.env.ROLE_SUPER_ADMIN]), userController.registerAdmin);
router.post('/register-super-admin', authMiddleware, authorizationMiddleware([process.env.ROLE_SUPER_ADMIN]), userController.registerSuperAdmin);

module.exports = router;
