const userService = require('../services/userServices');
const { specializeData } = require('../utils');

const register = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.profilePicture = req.file.path;
    }

    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const registerAgentRVA = async (req, res, next) => {
  try {
    const { userData, specialData } = specializeData(req.body, ["postNom", "workplace"]);

    if (req.file) {
      userData.profilePicture = req.file.path;
    }

    const agent = await userService.registerAgentRVA(userData, specialData);
    res.status(201).json(agent);
  } catch (error) {
    next(error);
  }
};

const registerAdmin = async (req, res, next) => {
  try {
    const { userData, specialData } = specializeData(req.body, ["postNom", "workplace", "fonction"]);

    if (req.file) {
      userData.profilePicture = req.file.path;
    }

    const admin = await userService.registerAdmin(userData, specialData);
    res.status(201).json(admin);
  } catch (error) {
    next(error);
  }
};

const registerSuperAdmin = async (req, res, next) => {
  try {
    const { userData, specialData } = specializeData(req.body, ["postNom", "workplace", "fonction"]);

    if (req.file) {
      userData.profilePicture = req.file.path;
    }

    const superAdmin = await userService.registerSuperAdmin(userData, specialData);
    res.status(201).json(superAdmin);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { user, token } = await userService.loginUser(req.body.username, req.body.password);
    res.status(200).json({ message: 'Connexion réussie', user, token });
  } catch (error) {
    next(error);
  }
};

const profil = async (req, res, next) => {
  try {
    const user = await userService.getUserProfile(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

const update = async (req, res, next) => {
  try {
    const { userData, specialData } = specializeData(req.body, ["postNom", "workplace"]);

    if (req.file) {
      userData.profilePicture = req.file.path;
    }

    const user = await userService.updateUser(req.user.id, userData, specialData);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  profil,
  registerAgentRVA,
  registerAdmin,
  registerSuperAdmin,
  update,
};
