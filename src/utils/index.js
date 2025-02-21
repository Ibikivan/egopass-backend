
/**
 * Separates data into two objects based on specified keys
 * @param {Object} data - The original data object to be split
 * @param {string[]} specializedKeys - Array of keys to be extracted into specialized data
 * @returns {Object} An object containing:
 *   - userData: Original data with specialized keys removed
 *   - specialData: Object containing only the specialized key-value pairs
 */
function specializeData(data, specializedKeys=[]) {
    const userData = {};
    const specialData = {};

    const dataEntries = Object.keys(data);
    if (!dataEntries.length) {
        return {userData, specialData};
    }

    dataEntries.forEach((key) => {
        if (specializedKeys.includes(key)) {
            specialData[key] = data[key];
        }
        if (!specializedKeys.includes(key)) {
            userData[key] = data[key];
        }
    });

    return {userData, specialData};
}

/**
 * Helper : Générer un code OTP (ici, 6 chiffres)
 * @returns {string} A randomly generated 6-digit code
 */
const generateResetCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = {
    specializeData,
    generateResetCode,
};
