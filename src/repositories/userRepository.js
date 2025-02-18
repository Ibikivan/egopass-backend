const User = require('../models/User');

const createUser = async (userData) => {
  return await User.create(userData);
};

const findUserByUsername = async (username) => {
  return await User.findOne({ where: { username } });
};

module.exports = {
  createUser,
  findUserByUsername,
};
