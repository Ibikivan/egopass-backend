const express = require('express');
const dotenv = require('dotenv');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizationMiddleware = require('../middlewares/autorizationMIddleware');
const router = express.Router();
const egopassController = require('../controllers/egopassController');

dotenv.config();

/**
 * @swagger
 * tags:
 *   name: eGoPASS
 *   description: API de gestion des eGoPASS
 */

/**
 * @swagger
 * /api/egopass/create:
 *   post:
 *     summary: Création d'un eGoPASS.
 *     tags: [eGoPASS]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Données de création d'un eGoPASS
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: string
 *                 example: "100"
 *               status:
 *                 type: string
 *                 enum: [ACTIVATED, DISACTIVATED]
 *                 example: "ACTIVATED"
 *     responses:
 *       201:
 *         description: eGoPASS créé avec succès.
 *       403:
 *         description: Autorisation insuffisante.
 */
router.post('/create', authMiddleware, authorizationMiddleware([process.env.ROLE_ADMIN]), egopassController.create);

/**
 * @swagger
 * /api/egopass/update/{id}:
 *   patch:
 *     summary: Mise à jour d'un eGoPASS.
 *     tags: [eGoPASS]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID de l'eGoPASS à mettre à jour.
 *     requestBody:
 *       description: Données à mettre à jour
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: string
 *                 example: "100"
 *               status:
 *                 type: string
 *                 enum: [ACTIVATED, DISACTIVATED]
 *                 example: "ACTIVATED"
 *     responses:
 *       200:
 *         description: eGoPASS mis à jour avec succès.
 *       403:
 *         description: Autorisation insuffisante.
 */
router.patch('/update/:id', authMiddleware, authorizationMiddleware([process.env.ROLE_ADMIN]), egopassController.update);

/**
 * @swagger
 * /api/egopass/get-free/{id}:
 *   get:
 *     summary: Récupération du QR Code d'un eGoPASS gratuit.
 *     tags: [eGoPASS]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID de l'eGoPASS gratuit.
 *     responses:
 *       200:
 *         description: QR Code récupéré avec succès.
 *       404:
 *         description: eGoPASS non trouvé.
 */
router.get('/get-free/:id', authMiddleware, egopassController.getFreeQrCode);

/**
 * @swagger
 * /api/egopass/get-payed/{id}:
 *   get:
 *     summary: Récupération du QR Code d'un eGoPASS payé.
 *     tags: [eGoPASS]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID de l'eGoPASS payé.
 *     responses:
 *       200:
 *         description: QR Code récupéré avec succès.
 *       404:
 *         description: eGoPASS non trouvé.
 */
router.get('/get-payed/:id', authMiddleware, egopassController.getPayedQrCode);

/**
 * @swagger
 * /api/egopass/get-all:
 *   get:
 *     summary: Récupération de tous les eGoPASS.
 *     tags: [eGoPASS]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: _limit
 *         schema:
 *           type: integer
 *         description: Limite de résultats par page.
 *       - in: query
 *         name: _page
 *         schema:
 *           type: integer
 *         description: Numéro de la page.
 *       - in: query
 *         name: _day
 *         schema:
 *           type: boolean
 *         description: Filtrer par date du jour.
 *       - in: query
 *         name: _disactivated
 *         schema:
 *           type: boolean
 *         description: Filtrer par statut désactivé.
 *       - in: query
 *         name: _free
 *         schema:
 *           type: boolean
 *         description: Inclure les eGoPASS gratuits.
 *       - in: query
 *         name: _payed
 *         schema:
 *           type: boolean
 *         description: Inclure les eGoPASS payés.
 *     responses:
 *       200:
 *         description: Liste des eGoPASS récupérée avec succès.
 *       403:
 *         description: Autorisation insuffisante.
 */
router.get('/get-all', authMiddleware, authorizationMiddleware([process.env.ROLE_AGENT]), egopassController.getAllPass);

/**
 * @swagger
 * /api/egopass/authenticate:
 *   post:
 *     summary: Authentification d'un eGoPASS gratuit.
 *     tags: [eGoPASS]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Token de l'eGoPASS à authentifier
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               passToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: eGoPASS authentifié avec succès.
 *       403:
 *         description: Autorisation insuffisante.
 */
router.post('/authenticate', authMiddleware, authorizationMiddleware([process.env.ROLE_AGENT]), egopassController.authenticate);

/**
 * @swagger
 * /api/egopass/disactivate:
 *   post:
 *     summary: Désactivation d'un eGoPASS gratuit.
 *     tags: [eGoPASS]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Token de l'eGoPASS à désactiver
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               passToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: eGoPASS désactivé avec succès.
 *       403:
 *         description: Autorisation insuffisante.
 */
router.post('/disactivate', authMiddleware, authorizationMiddleware([process.env.ROLE_AGENT]), egopassController.disactivate);

/**
 * @swagger
 * /api/egopass/delete-free/{id}:
 *   delete:
 *     summary: Suppression d'un eGoPASS gratuit.
 *     tags: [eGoPASS]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID de l'eGoPASS gratuit à supprimer.
 *     responses:
 *       200:
 *         description: eGoPASS supprimé avec succès.
 *       403:
 *         description: Autorisation insuffisante.
 */
router.delete('/delete-free/:id', authMiddleware, authorizationMiddleware([process.env.ROLE_ADMIN]), egopassController.deleteFreePass);

/**
 * @swagger
 * /api/egopass/delete-payed/{id}:
 *   delete:
 *     summary: Suppression d'un eGoPASS payé.
 *     tags: [eGoPASS]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID de l'eGoPASS payé à supprimer.
 *     responses:
 *       200:
 *         description: eGoPASS supprimé avec succès.
 *       403:
 *         description: Autorisation insuffisante.
 */
router.delete('/delete-payed/:id', authMiddleware, authorizationMiddleware([process.env.ROLE_ADMIN]), egopassController.deletePayedPass);

module.exports = router;