//authJwt.js
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const mongoose = require('mongoose');

const Community = require('../models/community.model.js');
const Product = require('../models/product.model.js');
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
    req.user = { _id: decoded.id || decoded._id };
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized!' });
  }
};

const isMemberInCommunity = async (req, res, next) => {
  const { communityId, productId } = req.params;
  const userId = req.user._id;
  const objectId = new mongoose.Types.ObjectId(communityId);
  let community;

  try {
    // used in getAllCommunityProducts
    if (communityId) {
      community = await Community.findById(objectId);
      if (!community) {
        return res.status(404).send({ message: 'Community not found' });
      }
    }
    // used in getProductById
    if (productId) {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).send({ message: 'Product not found ' });
      }

      community = await Community.findById(product.community);
    }

    if (!community) {
      return res.status(404).send({ message: 'Community is not found' });
    }

    if (!community.users.includes(userId)) {
      return res
        .status(403)
        .send({ message: 'You are not a member of the community' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

const isAdmin = (req, res, next) => {
  User.findById(req.user._id)
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }

      return Role.find({ _id: { $in: user.roles } }).exec();
    })
    .then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin' || roles[i].name === 'Admin') {
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
  isMemberInCommunity,
  isAdmin,
  isModerator,
};

module.exports = authJwt;
