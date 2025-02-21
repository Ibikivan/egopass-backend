const egopassServices = require('../services/egopassSevices');

const create = (req, res) => {
    try {
        const pass = egopassServices.createPass(req.body);
        res.status(201).json(pass);
    } catch (error) {
        next(error);
    }
}

const getFreeQrCode = (req, res) => {
    try {
        const passQrCode = egopassServices.getQrCodeForFreePass(req.params.id);
        res.status(200).json(passQrCode);
    } catch (error) {
        next(error);
    }
}

const getPayedQrCode = (req, res) => {
    try {
        const passQrCode = egopassServices.getQrCodeForPayedPass(req.params.id);
        res.status(200).json(passQrCode);
    } catch (error) {
        next(error);
    }
}

const update = (req, res) => {
    try {
        const pass = egopassServices.updatePass(req.params.id, req.body);
        res.status(200).json(pass);
    } catch (error) {
        next(error);
    }
}

const authenticate = (req, res) => {
    const pass = {
        from: 'Douala',
        to: 'Yaoundé',
        date: '2021-09-01',
        time: '08:00',
        price: 5000,
    }
    res.status(200).json({ message: 'Pass authentifié avec succès', pass });
};

const disactivate = (req, res) => {
    res.status(200).json({ message: 'Pass désactivé avec succès' });
}

module.exports = {
    create,
    getFreeQrCode,
    getPayedQrCode,
    update,
    authenticate,
    disactivate
};
