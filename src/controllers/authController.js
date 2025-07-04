const authService = require('../services/authService');
const { success, error } = require('../helpers/responseHelper');

exports.signup = async (req, res) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json(success(user, 'Utilisateur créé'));
  } catch (err) {
    res.status(400).json(error([err.message], 'Échec de l\'inscription'));
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const session = await authService.login(email, password);
    res.json(success(session, 'Connexion réussie'));
  } catch (err) {
    res.status(401).json(error([err.message], 'Échec de la connexion'));
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.params.token;
    if (!token) {
      return res.status(401).json(error(['Token requis'], 'Déconnexion échouée'));
    }

    await authService.logout(token);
    res.json(success([], 'Déconnexion réussie'));
  } catch (err) {
    res.status(400).json(error([err.message], 'Erreur pendant la déconnexion'));
  }
};

exports.checkSession = async (req, res) => {
  try {
    const token = req.params.token;
    if (!token) {
      return res.status(401).json(error(['Token requis'], 'Vérification échouée'));
    }

    const isValid = await authService.checkSession(token);
    res.json(success({ session_valid: isValid }, 'Vérification de session effectuée'));
  } catch (err) {
    res.status(400).json(error([err.message], 'Erreur de vérification de session'));
  }
};

exports.extendSession = async (req, res) => {
  try {
    const token = req.params.token;
    if (!token) {
      return res.status(401).json(error(['Token requis'], 'Prolongation échouée'));
    }

    const newExpiry = await authService.extendSession(token);
    res.json(success({ expires_at: newExpiry }, 'Session prolongée'));
  } catch (err) {
    res.status(400).json(error([err.message], 'Erreur de prolongation de session'));
  }
};
