//auth.config.js
const crypto = require('crypto');

const generateRandomSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

module.exports = {
  secret: process.env.JWT_SECRET || 'soppasdkmv654sdasd2sdfss2255qwe',
  expiresIn: 86400,
};
