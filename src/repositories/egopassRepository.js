const { FreeEGoPASS, PayedEGoPASS } = require('../models/index');

const createFreePass = async (passData, transaction=null) => {
    return await FreeEGoPASS.create(passData, { transaction });
};

const createPayedPass = async (passData, transaction=null) => {
    return await PayedEGoPASS.create(passData, { transaction });
};

const getFreePassById = async (passId) => {
    return await FreeEGoPASS.findByPk(passId);
}

const getPayedPassById = async (passId) => {
    return await PayedEGoPASS.findByPk(passId);
}

const updateFreePass = async (passId, passData, transaction=null) => {
    return await FreeEGoPASS.update(passData, { where: { id: passId }, returning: true, transaction });
};

const updatePayedPass = async (passId, passData, transaction=null) => {
    return await PayedEGoPASS.update(passData, { where: { id: passId }, returning: true, transaction });
}

const deleteFreePass = async (passId, transaction=null) => {
    return await FreeEGoPASS.destroy({ where: { id: passId }, transaction });
};

const deletePayedPass = async (passId, transaction=null) => {
    return await PayedEGoPASS.destroy({ where: { id: passId }, transaction });
}

module.exports = {
    createFreePass,
    createPayedPass,
    getFreePassById,
    getPayedPassById,
    updateFreePass,
    updatePayedPass,
    deleteFreePass,
    deletePayedPass,
};
