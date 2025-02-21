const QRCode = require('qrcode');

/**
 * Generates a QR Code from the provided text and returns it as a Data URL (base64 image)
 * @async
 * @param {string} text - The text to encode in the QR Code
 * @returns {Promise<string>} A Promise that resolves to the QR Code as a base64 Data URL
 * @throws {Error} If QR Code generation fails
 */
const generateQRCode = async (text) => {
  try {
    // Convertit le texte en Data URL (image en base64)
    const url = await QRCode.toDataURL(text);
    return url;
  } catch (error) {
    throw new Error('Erreur lors de la génération du QR Code : ' + error.message);
  }
};

module.exports = { generateQRCode };
