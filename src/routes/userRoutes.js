const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizationMiddleware = require('../middlewares/autorizationMIddleware');
const authController = require('../controllers/authController');
const upload = require('../utils/uploads');

dotenv.config();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API de gestion des utilisateurs
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Connexion d'un utilisateur.
 *     tags: [Users]
 *     requestBody:
 *       description: Informations de connexion de l'utilisateur
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie.
 *       401:
 *         description: Identifiants invalides.
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur.
 *     tags: [Users]
 *     requestBody:
 *       description: Informations d'inscription de l'utilisateur
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès.
 *       400:
 *         description: Erreur dans les données fournies.
 */
router.post('/register', upload.single('profilePicture'), userController.register);

/**
 * @swagger
 * /api/users/profil:
 *   get:
 *     summary: Récupération du profil de l'utilisateur connecté.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil récupéré avec succès.
 *       401:
 *         description: Utilisateur non autorisé.
 */
router.get('/profil', authMiddleware, userController.profil);

/**
 * @swagger
 * /api/users/profil/{email}:
 *   get:
 *     summary: Récupération du profil d'un utilisateur par email.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: L'email de l'utilisateur.
 *     responses:
 *       200:
 *         description: Profil récupéré avec succès.
 *       404:
 *         description: Utilisateur non trouvé.
 */
router.get('/profil/:email', userController.profilByEmail);

/**
 * @swagger
 * /api/users/update:
 *   patch:
 *     summary: Mise à jour du profil de l'utilisateur connecté.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Données à mettre à jour
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profil mis à jour avec succès.
 *       400:
 *         description: Erreur dans les données fournies.
 */
router.patch('/update', authMiddleware, upload.single('profilePicture'), userController.update);

/**
 * @swagger
 * /api/users/logout:
 *   get:
 *     summary: Déconnexion de l'utilisateur.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie.
 *       401:
 *         description: Utilisateur non autorisé.
 */
router.get('/logout', authMiddleware, authController.logout);

/**
 * @swagger
 * /api/users/request-reset-password:
 *   post:
 *     summary: Demande de réinitialisation de mot de passe.
 *     tags: [Users]
 *     requestBody:
 *       description: Identifiant de l'utilisateur (email ou numéro de téléphone)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Code de réinitialisation envoyé.
 *       404:
 *         description: Utilisateur non trouvé.
 */
router.post('/request-reset-password', authController.requestPasswordReset);

/**
 * @swagger
 * /api/users/verify-reset-code:
 *   post:
 *     summary: Vérification du code de réinitialisation.
 *     tags: [Users]
 *     requestBody:
 *       description: Identifiant de l'utilisateur et code de réinitialisation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               providedCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Code vérifié avec succès.
 *       400:
 *         description: Code incorrect ou expiré.
 */
router.post('/verify-reset-code', authController.verifyCode);

/**
 * @swagger
 * /api/users/reset-password:
 *   post:
 *     summary: Réinitialisation du mot de passe.
 *     tags: [Users]
 *     requestBody:
 *       description: Identifiant de l'utilisateur et nouveau mot de passe
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mot de passe réinitialisé avec succès.
 *       400:
 *         description: Code de réinitialisation incorrect ou expiré.
 */
router.post('/reset-password', authController.resetPassword);

/**
 * @swagger
 * /api/users/register-agent:
 *   post:
 *     summary: Inscription d'un nouvel agent RVA.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Informations d'inscription de l'agent RVA
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               postNom:
 *                 type: string
 *               workplace:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Agent RVA créé avec succès.
 *       403:
 *         description: Autorisation insuffisante.
 */
router.post('/register-agent', authMiddleware, authorizationMiddleware([process.env.ROLE_ADMIN]), upload.single('profilePicture'), userController.registerAgentRVA);

/**
 * @swagger
 * /api/users/register-admin:
 *   post:
 *     summary: Inscription d'un nouvel administrateur.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Informations d'inscription de l'administrateur
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               postNom:
 *                 type: string
 *               workplace:
 *                 type: string
 *               fonction:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Administrateur créé avec succès.
 *       403:
 *         description: Autorisation insuffisante.
 */
router.post('/register-admin', authMiddleware, authorizationMiddleware([process.env.ROLE_SUPER_ADMIN]), upload.single('profilePicture'), userController.registerAdmin);

/**
 * @swagger
 * /api/users/register-super-admin:
 *   post:
 *     summary: Inscription d'un nouveau super administrateur.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Informations d'inscription du super administrateur
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               postNom:
 *                 type: string
 *               workplace:
 *                 type: string
 *               fonction:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Super administrateur créé avec succès.
 *       403:
 *         description: Autorisation insuffisante.
 */
router.post('/register-super-admin', upload.single('profilePicture'), userController.registerSuperAdmin);

module.exports = router;
