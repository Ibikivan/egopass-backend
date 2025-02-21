const egopassRepository = require('../repositories/egopassRepository');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { generateQRCode } = require('../utils/qrCode');

dotenv.config();

const createPass = async (pass) => {
    if (parseInt(pass.amount) === 0) {
        return await egopassRepository.createFreePass(pass);
    }

    if (parseInt(pass.amount) > 0) {
        return await egopassRepository.createPayedPass(pass);
    }
}

const getQrCodeForFreePass = async (passId) => {
    const pass = await egopassRepository.getFreePassById(passId);
    if (!pass) {
        throw new Error('e-GoPass non trouvé');
    }

    const qrContent = jwt.sign(
        { id: pass.id, status: pass.statut },
        process.env.JWT_SECRET
    );
    const qrCodeToDataUrl = await generateQRCode(qrContent);
    return {qrCodeToDataUrl, pass};
}

const getFreeEGoPassById = async (passId) => {
    return await egopassRepository.getFreePassById(passId);
}

const getQrCodeForPayedPass = async (passId) => {
    const pass = await egopassRepository.getPayedPassById(passId);
    if (!pass) {
        throw new Error('e-GoPass non trouvé');
    }

    const qrContent = jwt.sign(
        { id: pass.id, status: pass.statut },
        process.env.JWT_SECRET
    );
    const qrCodeToDataUrl = await generateQRCode(qrContent);
    return {qrCodeToDataUrl, pass};
}

const getPayedEGoPassById = async (passId) => {
    return await egopassRepository.getPayedPassById(passId);
}

const updatePass = async (passId, passData) => {
    if (parseInt(passData.amount) === 0) {
        return await egopassRepository.updateFreePass(passId, passData);
    }

    if (parseInt(passData.amount) > 0) {
        return await egopassRepository.updatePayedPass(passId, passData);
    }
}

module.exports = {
    createPass,
    getQrCodeForFreePass,
    getFreeEGoPassById,
    getQrCodeForPayedPass,
    getPayedEGoPassById,
    updatePass,
};
