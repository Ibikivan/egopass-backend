const travelerRepository = require('../repositories/travelersRepository');
const sequelize = require('../config/database');

const createTraveler = async (travelerData) => {
    return await sequelize.transaction(async (transaction) => {
        return await travelerRepository.createTraveler(travelerData, transaction);
    });
};

const getTravelerById = async (id) => {
    return await travelerRepository.getTravelerById(id);
};

const getAllTravelers = async (filters) => {
    return await travelerRepository.getAll(filters)
}

const updateTraveler = async (id, travelerData) => {
    return await travelerRepository.updateTraveler(id, travelerData);
};

const deleteTraveler = async (id) => {
    return await travelerRepository.deleteTraveler(id);
};

module.exports = {
    createTraveler,
    getTravelerById,
    getAllTravelers,
    updateTraveler,
    deleteTraveler,
};
