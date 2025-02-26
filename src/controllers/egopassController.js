const egopassServices = require('../services/egopassSevices');

const create = async(req, res, next) => {
    try {
        const pass = await egopassServices.createPass(req.body);
        res.status(201).json(pass);
    } catch (error) {
        next(error);
    }
}

const getFreeQrCode = async(req, res, next) => {
    try {
        const passQrCode = await egopassServices.getQrCodeForFreePass(req.params.id);
        res.status(200).json(passQrCode);
    } catch (error) {
        next(error);
    }
}

const getPayedQrCode = async(req, res, next) => {
    try {
        const passQrCode = await egopassServices.getQrCodeForPayedPass(req.params.id);
        res.status(200).json(passQrCode);
    } catch (error) {
        next(error);
    }
}

const update = async(req, res, next) => {
    try {
        const pass = await egopassServices.updatePass(req.params.id, req.body);
        res.status(200).json(pass);
    } catch (error) {
        next(error);
    }
}

const authenticate = async(req, res, next) => {
    try {
        const pass = await egopassServices.authenticateFreePass(req.body);
        res.status(200).json({ message: 'e-GoPASS authentifié avec succès', pass });
    } catch (error) {
        next(error);
    }
};

const disactivate = async(req, res, next) => {
    try {
        const pass = await egopassServices.disactivateFreePass(req.body);
        res.status(200).json({ message: 'e-GoPASS désactivé avec succès', pass });
    } catch (error) {
        next(error);
    }
}

const deleteFreePass = async(req, res, next) => {
    try {
        const pass = await egopassServices.deleteFreePass(req.params.id);
        res.status(200).json({ message: 'e-GoPASS supprimé avec succès', pass });
    } catch (error) {
        next(error);
    }
}

const deletePayedPass = async(req, res, next) => {
    try {
        const pass = await egopassServices.deletePayedPass(req.params.id);
        res.status(200).json({ message: 'e-GoPASS supprimé avec succès', pass });
    } catch (error) {
        next(error);
    }
}

const getAllPass = async (req, res, next) => {
    try {
        const result = await egopassServices.getAllEgopasses(req.query);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const getAllUserFree = async (req, res, next) => {
    try {;
        const result = await egopassServices.getAllUserFree();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    };
};

module.exports = {
    create,
    getFreeQrCode,
    getPayedQrCode,
    update,
    authenticate,
    disactivate,
    deleteFreePass,
    deletePayedPass,
    getAllPass,
    getAllUserFree
};
