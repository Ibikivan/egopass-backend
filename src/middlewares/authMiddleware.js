const jwt = require('jsonwebtoken');
const { isTokenBlacklisted } = require('../utils/tokenBlacklist');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Accès non autorisé : token manquant' });
  }

  // Récupère le token depuis les cookies
  // const token = req.cookies.token;

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé : format du token invalide' });
  }

  // Vérifie si le token est révoqué
  if (isTokenBlacklisted(token)) {
    return res.status(401).json({ message: 'Token révoqué' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
    // On attache les informations du token à la requête
    req.user = { id: decoded.id, role: decoded.role };
    next();
  });
};

module.exports = authMiddleware;
