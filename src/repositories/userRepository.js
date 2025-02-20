const {
  User,
  AgentRVA,
  Admin,
  SuperAdmin
} = require('../models/index');

const createUser = async (userData, transaction = null) => {
  return await User.create(userData, { transaction });
};

const findUserByUsername = async (username) => {
  return await User.findOne({ where: { username } });
};

const findUserById = async (id) => {
  return await User.findByPk(id, {
    include: [
      {model: AgentRVA, as: "agentRVA"},
      {model: Admin, as: "admin"},
      {model: SuperAdmin, as: "superAdmin"},
    ]
  });
}

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
};
