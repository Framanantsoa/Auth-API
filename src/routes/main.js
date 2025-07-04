const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API pour l'authentification et la gestion de session
 */

// SIGNUP
router.post('/signup', authController.signup);

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Créer un compte utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [first_name, name, email, password, gender_id]
 *             properties:
 *               first_name:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               gender_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 */

// LOGIN
router.post('/login', authController.login);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Se connecter et créer une session
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie avec token
 *       401:
 *         description: Email ou mot de passe incorrect
 */

// LOGOUT (GET)
router.get('/logout/:token', authController.logout);

/**
 * @swagger
 * /logout/{token}:
 *   get:
 *     summary: Se déconnecter avec un token
 *     tags: [Auth]
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *       401:
 *         description: Token invalide
 */

// CHECK SESSION (GET)
router.get('/check-session/:token', authController.checkSession);

/**
 * @swagger
 * /check-session/{token}:
 *   get:
 *     summary: Vérifier la validité d'une session
 *     tags: [Auth]
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session valide
 *       401:
 *         description: Token invalide
 */

// EXTEND SESSION (GET)
router.get('/extend-session/:token', authController.extendSession);

/**
 * @swagger
 * /extend-session/{token}:
 *   get:
 *     summary: Prolonger la session
 *     tags: [Auth]
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session prolongée
 *       401:
 *         description: Token invalide ou expiré
 */

module.exports = router;
