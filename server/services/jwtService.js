const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

// Function to generate a JWT token
function generateToken(
  payload,
  secret = config.secret,
  options = { expiresIn: 86400 }
) {
  return jwt.sign(payload, secret, options);
}

// Function to verify a JWT token
function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

// Function to decode a JWT token
function decodeToken(token) {
  return jwt.decode(token);
}

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
};
