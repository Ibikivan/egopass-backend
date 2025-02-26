const jwt = require('jsonwebtoken');
const { isTokenBlacklisted } = require('../utils/tokenBlacklist');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // Récupère le token depuis les cookies
  const cookieToken = req.cookies.token;
  if (!cookieToken && !authHeader) {
    return res.status(401).json({ message: 'Accès non autorisé : format du token invalide ou token manquant' });
  }
  const authToken = authHeader.split(' ')[1];

  const token = cookieToken || authToken;
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
