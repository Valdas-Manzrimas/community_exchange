//authJwt.js
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.user;
const Role = db.role;

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }
  try {
    const decoded = jwt.verify(token, config.secret);
    // changed from decoded._id to decoded.id
    req.user = { _id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized!' });
  }
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId)
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }

      return Role.find({ _id: { $in: user.roles } }).exec();
    })
    .then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          return next();
        }
      }

      res.status(403).send({ message: 'Require Admin Role!' });
    })
    .catch((error) => {
      console.error('Error during isAdmin check:', error);
      res.status(500).send({ message: 'Internal Server Error.' });
    });
};

const isModerator = (req, res, next) => {
  User.findById(req.userId)
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }

      return Role.find({ _id: { $in: user.roles } }).exec();
    })
    .then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
          return next();
        }
      }

      res.status(403).send({ message: 'Require Moderator Role!' });
    })
    .catch((error) => {
      console.error('Error during isModerator check:', error);
      res.status(500).send({ message: 'Internal Server Error.' });
    });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};

module.exports = authJwt;
