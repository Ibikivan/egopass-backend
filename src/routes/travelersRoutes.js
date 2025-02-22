const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const travelersController = require('../controllers/travelersController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Travelers
 *   description: API de gestion des voyageurs
 */

/**
 * @swagger
 * /api/travels/create:
 *   post:
 *     summary: Création d'un voyageur.
 *     tags: [Travelers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Données de création d'un voyageur
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               passId:
 *                 type: integer
 *               flyType:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               postNom:
 *                 type: string
 *               nationality:
 *                 type: string
 *               passeportNumber:
 *                 type: string
 *               flyCompany:
 *                 type: string
 *               flyNumber:
 *                 type: string
 *               provenance:
 *                 type: string
 *               destination:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               homeAddress:
 *                 type: string
 *     responses:
 *       201:
 *         description: Voyageur créé avec succès.
 *       400:
 *         description: Erreur dans les données fournies.
 */
router.post('/create', authMiddleware, travelersController.createTravel);

/**
 * @swagger
 * /api/travels/get/{id}:
 *   get:
 *     summary: Récupération d'un voyageur par ID.
 *     tags: [Travelers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID du voyageur.
 *     responses:
 *       200:
 *         description: Voyageur récupéré avec succès.
 *       404:
 *         description: Voyageur non trouvé.
 */
router.get('/get/:id', authMiddleware, travelersController.getTravel);

/**
 * @swagger
 * /api/travels/update/{id}:
 *   patch:
 *     summary: Mise à jour d'un voyageur.
 *     tags: [Travelers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID du voyageur à mettre à jour.
 *     requestBody:
 *       description: Données à mettre à jour
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               passId:
 *                 type: integer
 *               flyType:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               postNom:
 *                 type: string
 *               nationality:
 *                 type: string
 *               passeportNumber:
 *                 type: string
 *               flyCompany:
 *                 type: string
 *               flyNumber:
 *                 type: string
 *               provenance:
 *                 type: string
 *               destination:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               homeAddress:
 *                 type: string
 *     responses:
 *       200:
 *         description: Voyageur mis à jour avec succès.
 *       400:
 *         description: Erreur dans les données fournies.
 */
router.patch('/update/:id', authMiddleware, travelersController.updateTravel);

/**
 * @swagger
 * /api/travels/delete/{id}:
 *   delete:
 *     summary: Suppression d'un voyageur.
 *     tags: [Travelers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID du voyageur à supprimer.
 *     responses:
 *       200:
 *         description: Voyageur supprimé avec succès.
 *       404:
 *         description: Voyageur non trouvé.
 */
router.delete('/delete/:id', authMiddleware, travelersController.deleteTravel);

module.exports = router;