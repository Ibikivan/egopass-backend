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

const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

const findUserByPhoneNumber = async (phoneNumber) => {
  return await User.findOne({ where: { phoneNumber } });
};

const updateUser = async (id, userData, transaction = null) => {
  return await User.update(userData, { where: { id }, returning: true, transaction });
};

const updateResetCode = async (userId, resetCode, resetCodeExpires, transaction = null) => {
  return await User.update(
    { resetCode, resetCodeExpires },
    { where: { id: userId }, transaction }
  );
};

const updateUserPassword = async (userId, hashedPassword, transaction = null) => {
  return await User.update(
    { password: hashedPassword },
    { where: { id: userId }, transaction }
  );
};

const clearResetCode = async (userId, transaction = null) => {
  return await User.update(
    { resetCode: null, resetCodeExpires: null },
    { where: { id: userId }, transaction }
  );
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserByEmail,
  findUserByPhoneNumber,
  findUserById,
  updateUser,
  updateResetCode,
  updateUserPassword,
  clearResetCode
};
