const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const travelersController = require('../controllers/travelersController');

const router = express.Router();

// CRUD travelers routes
router.post('/create', authMiddleware, travelersController.createTravel);
router.get('/get/:id', authMiddleware, travelersController.getTravel);
router.patch('/update/:id', authMiddleware, travelersController.updateTravel);
router.delete('/delete/:id', authMiddleware, travelersController.deleteTravel);

module.exports = router;