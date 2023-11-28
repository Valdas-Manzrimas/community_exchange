const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../config/auth.config');
const User = require('../models/user.model');
const Role = require('../models/role.model');
const { signup } = require('./auth.controller.js');

const { Storage } = require('@google-cloud/storage');

const Community = require('../models/community.model');

const storage = new Storage({
  projectId: 'norse-bond-299713',
  keyFilename: './norse-bond-299713-7470e7a36420.json',
});

const bucketName = 'community_exchange';

exports.getBucketFolderName = (communityName) => {
  return `${communityName.replace(/ /g, '-')}`;
};

const createCommunityAndUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const existingCommunity = await Community.findOne({ name: req.body.name });
    if (existingCommunity) {
      return res
        .status(400)
        .json({ message: 'Community with provided name already exists' });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    const { user, token } = await signup(req, session);

    req.body.owner = user._id;
    const community = await createCommunity(req, session);

    const moderatorRole = await Role.findOne({ name: 'moderator' });
    user.roles.push({ _id: moderatorRole._id, communityRef: community._id });
    await user.save({ session });

    await session.commitTransaction();

    res.status(201).json({
      message: 'User and community were registered successfully!',
      token: token,
    });
  } catch (error) {
    console.error('Error during user and community registration:', error);
    res.status(500).json({
      message: 'An error occurred during user and community registration.',
    });
  }
};

// Create a new community
const createCommunity = async (req, session) => {
  const { name, description, pictures, country, city, plan, owner } = req.body;

  const newCommunity = new Community({
    name,
    description,
    pictures,
    country,
    users: [owner],
    city,
    plan,
    moderator: owner,
  });

  const folderName = exports.getBucketFolderName(name);
  const file = storage.bucket(bucketName).file(`${folderName}/`);
  await file.save('');

  await newCommunity.save({ session });

  return newCommunity;
};

// Update an existing community
const updateCommunity = (req, res) => {
  const { id } = req.params;
  const { name, description, pictures, country, city, plan } = req.body;

  Community.findByIdAndUpdate(
    id,
    {
      name,
      description,
      pictures,
      country,
      city,
      plan,
    },
    { new: true }
  )
    .then((community) => {
      if (community) {
        res.json(community);
      } else {
        res.status(404).json({ error: 'Community not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to update community' });
    });
};

// Delete a community
const deleteCommunity = (req, res) => {
  const { id } = req.params;

  Community.findByIdAndDelete(id)
    .then((community) => {
      if (community) {
        res.json({ message: 'Community deleted successfully' });
      } else {
        res.status(404).json({ error: 'Community not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to delete community' });
    });
};

module.exports = {
  createCommunityAndUser,
  updateCommunity,
  deleteCommunity,
};
