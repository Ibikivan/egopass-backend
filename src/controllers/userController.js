const userService = require('../services/userServices');

const register = async (req, res, next) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await userService.loginUser(req.body.username, req.body.password);
    res.status(200).json({ message: 'Connexion réussie', user });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
