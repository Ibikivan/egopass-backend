const { Admin } = require('../models/index');

const createAdmin = async (adminData, transaction = null) => {
    return await Admin.create(adminData, { transaction });
};

module.exports = {
    createAdmin,
};
