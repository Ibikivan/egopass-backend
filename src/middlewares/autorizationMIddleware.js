/**
 * Middleware d'autorisation
 * @param {Array} allowedRoles - Tableau des rôles autorisés pour accéder à la route.
 */
const authorizationMiddleware = (allowedRoles) => {
    return (req, res, next) => {
      // Vérifier que l'utilisateur est authentifié et que son rôle est présent
      if (!req.user || !req.user.role) {
        return res.status(403).json({ message: 'Accès interdit : informations d\'utilisateur manquantes' });
      }

      console.log({allowedRoles, userRole: req.user.role, isIncludes: !allowedRoles.includes(req.user.role)});

      // Vérifier si le rôle de l'utilisateur est dans la liste des rôles autorisés
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Accès interdit : autorisation insuffisante' });
      }
      next();
    };
  };
  
  module.exports = authorizationMiddleware;
  