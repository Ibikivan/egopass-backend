const userRepository = require('../repositories/userRepository');
const agentRVARepository = require('../repositories/agentRVARepository');
const adminRepository = require('../repositories/adminRepository');
const superAdminRepository = require('../repositories/superAdminRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { sequelize } = require('../models');

dotenv.config();

const registerUser = async (userData) => {
  return await sequelize.transaction(async (transaction) => {
    // Hashage du mot de passe
    userData.password = await bcrypt.hash(userData.password, 10);
    return await userRepository.createUser(userData, transaction);
  })
};

const registerAgentRVA = async (userData, agentData) => {
  return await sequelize.transaction(async (transaction) => {
    userData.role = 'AGENT_RVA';

    // Hashage du mot de passe
    userData.password = await bcrypt.hash(userData.password, 10);
    const user = await userRepository.createUser(userData, transaction);

    // Génération de l'enregistrement spécialisé à partir du user.id
    agentData.id = user.id;
    const agentRVA = await agentRVARepository.createAgentRVA(agentData, transaction);
    
    const agent = { ...user.toJSON(), ...agentRVA.toJSON() };
    return agent;
  });
};

const registerAdmin = async (userData, adminData) => {
  return await sequelize.transaction(async (transaction) => {
    userData.role = 'ADMIN';

    // Hashage du mot de passe
    userData.password = await bcrypt.hash(userData.password, 10);
    const user = await userRepository.createUser(userData, transaction);

    // Génération de l'enregistrement spécialisé à partir du user.id
    adminData.id = user.id;
    const agentRVA = await adminRepository.createAdmin(adminData, transaction);
    
    const admin = { ...user.toJSON(), ...agentRVA.toJSON() };
    return admin;
  });
};

const registerSuperAdmin = async (userData, superAdminData) => {
  return await sequelize.transaction(async (transaction) => {
    userData.role = 'SUPER_ADMIN';

    // Hashage du mot de passe
    userData.password = await bcrypt.hash(userData.password, 10);
    const user = await userRepository.createUser(userData, transaction);

    // Génération de l'enregistrement spécialisé à partir du user.id
    superAdminData.id = user.id;
    const agentRVA = await superAdminRepository.createSuperAdmin(superAdminData, transaction);
    
    const superAdmin = { ...user.toJSON(), ...agentRVA.toJSON() };
    return superAdmin;
  });
};

const loginUser = async (username, password) => {
  const user = await userRepository.findUserByUsername(username);
  if (!user) throw new Error('Utilisateur non trouvé');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Mot de passe incorrect');

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );

  return { user, token };
};

const getUserProfile = async (id) => {
  return await userRepository.findUserById(id);
}

module.exports = {
  registerUser,
  registerAgentRVA,
  registerAdmin,
  registerSuperAdmin,
  loginUser,
  getUserProfile,
};
