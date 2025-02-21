const tokenBlacklist = new Set();

/**
 * Adds a token to the blacklist set
 * @param {string} token - The token to be blacklisted
 * @returns {void}
 */
const addTokenToBlacklist = (token) => {
  tokenBlacklist.add(token);
};

/**
 * Checks if a token is present in the blacklist
 * @param {string} token - The token to check
 * @returns {boolean} - Returns true if the token is blacklisted, false otherwise
 */
const isTokenBlacklisted = (token) => {
  return tokenBlacklist.has(token);
};

module.exports = { addTokenToBlacklist, isTokenBlacklisted };
