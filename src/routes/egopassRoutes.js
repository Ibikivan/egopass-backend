const express = require('express');
const dotenv = require('dotenv');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizationMiddleware = require('../middlewares/autorizationMIddleware');
const router = express.Router();
const egopassController = require('../controllers/egopassController');

dotenv.config();

// CRUD eGoPASS routes
router.post('/create', authMiddleware, authorizationMiddleware([process.env.ROLE_ADMIN]), egopassController.create);
router.patch('/update/:id', authMiddleware, authorizationMiddleware([process.env.ROLE_ADMIN]), egopassController.update);

// EGoPASS transactions routes
router.get('/get-free/:id', authMiddleware, egopassController.getFreeQrCode);
router.get('/get-payed/:id', authMiddleware, egopassController.getPayedQrCode);
router.get('/get-all', authMiddleware, authorizationMiddleware([process.env.ROLE_AGENT]), egopassController.getAllPass);
router.post('/authenticate', authMiddleware, authorizationMiddleware([process.env.ROLE_AGENT]), egopassController.authenticate);
router.post('/disactivate', authMiddleware, authorizationMiddleware([process.env.ROLE_AGENT]), egopassController.disactivate);
router.delete('/delete-free/:id', authMiddleware, authorizationMiddleware([process.env.ROLE_ADMIN]), egopassController.deleteFreePass);
router.delete('/delete-payed/:id', authMiddleware, authorizationMiddleware([process.env.ROLE_ADMIN]), egopassController.deletePayedPass);

module.exports = router;