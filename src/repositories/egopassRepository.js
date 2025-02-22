const { FreeEGoPASS, PayedEGoPASS } = require('../models/index');
const { Op } = require('sequelize');

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

const getAllEgopasses = async (filters) => {
    // Extraction des filtres avec des valeurs par défaut
    const limit = parseInt(filters._limit, 10) || 10;
    const page = parseInt(filters._page, 10) || 1;
    const day = filters._day === 'true' || filters._day === true;
    const disactivated = filters._disactivated;
    const freeFilter = (typeof filters._free === 'undefined') ? true : (filters._free === 'true' || filters._free === true);
    const payedFilter = (typeof filters._payed === 'undefined') ? true : (filters._payed === 'true' || filters._payed === true);

    // Préparer la clause where commune pour le champ updatedAt et status
    const whereClause = {};

    if (day) {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        whereClause.updatedAt = { [Op.between]: [start, end] };
    }

    if (typeof disactivated !== 'undefined') {
        if (disactivated === 'true' || disactivated === true) {
            whereClause.status = 'DISACTIVATED';
        } else if (disactivated === 'false' || disactivated === false) {
            whereClause.status = { [Op.ne]: 'DISACTIVATED' };
        }
    }

    // Effectuer les requêtes sur FreeEGoPASS et PayedEGoPASS selon les filtres
    let freePasses = [];
    let payedPasses = [];

    if (freeFilter) {
        freePasses = await FreeEGoPASS.findAll({
            where: whereClause,
            order: [['updatedAt', 'DESC']]
        });
    }
    if (payedFilter) {
        payedPasses = await PayedEGoPASS.findAll({
            where: whereClause,
            order: [['updatedAt', 'DESC']]
        });
    }

    // Fusionner les deux tableaux
    let allPasses = freePasses.concat(payedPasses);

    // Trier par updatedAt décroissant
    allPasses.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    // Pagination : calculer l'offset et limiter le résultat
    const total = allPasses.length;
    const offset = (page - 1) * limit;
    const paginatedPasses = allPasses.slice(offset, offset + limit);

    return { total, items: paginatedPasses };
};

module.exports = {
    createFreePass,
    createPayedPass,
    getFreePassById,
    getPayedPassById,
    updateFreePass,
    updatePayedPass,
    deleteFreePass,
    deletePayedPass,
    getAllEgopasses,
};
