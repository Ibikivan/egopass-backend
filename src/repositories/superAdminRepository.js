const { SuperAdmin } = require('../models/index');

const createSuperAdmin = async (superAdminData, transaction = null) => {
    return await SuperAdmin.create(superAdminData, { transaction });
};

module.exports = {
    createSuperAdmin,
};
