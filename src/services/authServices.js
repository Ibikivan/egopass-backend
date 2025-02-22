const { sequelize } = require('../models');
const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const { generateResetCode } = require('../utils');
const { sendEmailOTP } = require('../utils/emailService');
const { sendSMSOTP } = require('../utils/smsService');
const { addTokenToBlacklist } = require('../utils/tokenBlacklist');

const requestPasswordReset = async (identifier) => {
    const user = identifier.email
    ? await userRepository.findUserByEmail(identifier.email)
    : await userRepository.findUserByPhoneNumber(identifier.phoneNumber);

    if (!user) {
        throw new Error('Utilisateur non trouvé');
    }

    // Génère un code de réinitialisation et définit une expiration (15 minutes)
    const resetCode = generateResetCode();
    const resetCodeExpires = new Date(Date.now() + 15 * 60 * 1000);

    await userRepository.updateResetCode(user.id, resetCode, resetCodeExpires);

    if (identifier.email) {
        await sendEmailOTP(identifier.email, resetCode);
    } else if (identifier.phoneNumber) {
        await sendSMSOTP(identifier.phoneNumber, resetCode);
    } else {
        throw new Error('Aucune adresse email ou numéro de téléphone valide fourni.');
    }

    return { message: 'Un code de réinitialisation a été envoyé.' };
};

const verifyCode = async (identifier, providedCode) => {
    const user = identifier.email
    ? await userRepository.findUserByEmail(identifier.email)
    : await userRepository.findUserByPhoneNumber(identifier.phoneNumber);

    // Vérifie que le code existe et n'est pas expiré
    if (!user.resetCode || !user.resetCodeExpires || new Date() > user.resetCodeExpires) {
        throw new Error('Le code de réinitialisation a expiré ou est invalide.');
    }
    
    // Vérifie si le code fourni correspond
    if (user.resetCode !== providedCode) {
        throw new Error('Code de réinitialisation incorrect.');
    }
    
    // Génère un code de réinitialisation et définit une expiration (15 minutes)
    const resetCode = "verified";
    const resetCodeExpires = new Date(Date.now() + 15 * 60 * 1000);
    await userRepository.updateResetCode(user.id, resetCode, resetCodeExpires);

    return { message: 'Code OTP vérifié avec succès.' };
};

const resetPassword = async (identifier, newPassword) => {
    const user = identifier.email
    ? await userRepository.findUserByEmail(identifier.email)
    : await userRepository.findUserByPhoneNumber(identifier.phoneNumber);

    // Vérifie que le code existe et n'est pas expiré
    if (!user.resetCode || user.resetCode !== 'verified' || !user.resetCodeExpires || new Date() > user.resetCodeExpires) {
        await userRepository.clearResetCode(user.id);
        throw new Error('Le code de réinitialisation a expiré ou est invalide.');
    }

    // Hache le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Met à jour le mot de passe et efface le code de réinitialisation dans une transaction
    await sequelize.transaction(async (transaction) => {
        await userRepository.updateUserPassword(user.id, hashedPassword, transaction);
        await userRepository.clearResetCode(user.id, transaction);
    });
};

const logout = (token) => {
  if (token) {
    const splitedToken = token.split(' ')[1];
    addTokenToBlacklist(splitedToken);
  }
  return { message: 'Déconnexion réussie' };
};

module.exports = {
    requestPasswordReset,
    verifyCode,
    resetPassword,
    logout
};
