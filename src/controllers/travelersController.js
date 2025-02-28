const travelerServices = require('../services/travelerServices');

const createTravel = async (req, res, next) => {
    try {
        const traveler = await travelerServices.createTraveler(req.body);
        res.status(201).json(traveler);
    } catch (error) {
        next(error);
    }
};

const getTravel = async (req, res, next) => {
    try {
        const traveler = await travelerServices.getTravelerById(req.params.id);
        res.status(200).json(traveler);
    } catch (error) {
        next(error);
    }
};

const getAllTravels = async (req, res, next) => {
    try {
        const filters = {
            _activated: req.query._activated,
            _disactivated: req.query._disactivated
        };

        const travelers = await travelerServices.getAllTravelers(filters)
        res.status(200).json(travelers)
    } catch (error) {
        next(error)
    }
}

const updateTravel = async (req, res, next) => {
    try {
        const traveler = await travelerServices.updateTraveler(req.params.id, req.body);
        res.status(200).json(traveler);
    } catch (error) {
        next(error);
    }
};

const deleteTravel = async (req, res, next) => {
    try {
        const traveler = await travelerServices.deleteTraveler(req.params.id);
        res.status(200).json({ message: 'Voyageur supprimé avec succès', traveler });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createTravel,
    getTravel,
    getAllTravels,
    updateTravel,
    deleteTravel,
};
