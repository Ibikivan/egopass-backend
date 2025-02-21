const authservices = require('../services/authServices');

const requestPasswordReset = async (req, res, next) => {
  try {
    const response = await authservices.requestPasswordReset(req.body.identifier);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

const verifyCode = async (req, res, next) => {
  try {
    const response = await authservices.verifyCode(req.body.identifier, req.body.providedCode);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

const resetPassword = async (req, res, next) => {
  try {
    await authservices.resetPassword(req.body.identifier, req.body.newPassword);
    res.status(200).json({ message: 'Mot de passe réinitialisé avec succès.' });
  } catch (error) {
    next(error);
  }
}

const logout = (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    res.status(200).json(authservices.logout(authToken));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  requestPasswordReset,
  verifyCode,
  resetPassword,
  logout
};
