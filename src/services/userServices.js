const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');

const registerUser = async (userData) => {
  // Hashage du mot de passe
  userData.password = await bcrypt.hash(userData.password, 10);
  return await userRepository.createUser(userData);
};

const loginUser = async (username, password) => {
  const user = await userRepository.findUserByUsername(username);
  if (!user) throw new Error('Utilisateur non trouvé');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Mot de passe incorrect');

  // Génération d'un token JWT (à implémenter)
  return user;
};

module.exports = {
  registerUser,
  loginUser,
};
