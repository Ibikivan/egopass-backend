const egopassRepository = require('../repositories/egopassRepository');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { generateQRCode } = require('../utils/qrCode');
const sequelize = require('../config/database')

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

const authenticateFreePass = async (passToken) => {
    const decodedToken = jwt.verify(passToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw new Error('Token invalide ou expiré');
        }
        return {id: decoded.id, status: decoded.status};
    });

    const pass = await egopassRepository.getFreePassById(decodedToken.id);

    if (pass.status === 'DISACTIVATED' || decodedToken.status === 'DISACTIVATED') {
        throw new Error("e-GoPass déjà désactivé");
    }

    return pass;
}

const disactivateFreePass = async (passToken) => {
    return await sequelize.transaction(async (transaction) => {
        const decodedToken = jwt.verify(passToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                throw new Error('Token invalide ou expiré');
            }
            return {id: decoded.id, status: decoded.status};
        });
    
        const pass = await egopassRepository.getFreePassById(decodedToken.id, transaction);
    
        if (pass.status === 'DISACTIVATED' || decodedToken.status === 'DISACTIVATED') {
            throw new Error("e-GoPass déjà désactivé");
        }
    
        return await egopassRepository.updateFreePass(decodedToken.id, {status: 'DISACTIVATED'}, transaction);
    })
}

const deleteFreePass = async(passId) => {
    // return await sequelize.transaction(async (transaction) => {
    //     const pass = await egopassRepository.getFreePassById(passId, transaction);
    //     if (!pass) {
    //         throw new Error('e-GoPass non trouvé');
    //     }
    
        return await egopassRepository.deleteFreePass(
            passId,
            // transaction
        );
    // })
}

const deletePayedPass = async(passId) => {
    return await egopassRepository.deletePayedPass(passId);
}

const getAllEgopasses = async (queryParams) => {
  return await egopassRepository.getAllEgopasses(queryParams);
};

const getAllUserFree = async () => {
    return await egopassRepository.getAllUserFree();
};

module.exports = {
    createPass,
    getQrCodeForFreePass,
    getFreeEGoPassById,
    getQrCodeForPayedPass,
    getPayedEGoPassById,
    updatePass,
    authenticateFreePass,
    disactivateFreePass,
    deleteFreePass,
    deletePayedPass,
    getAllEgopasses,
    getAllUserFree
};
