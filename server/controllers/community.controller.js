const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../config/auth.config');
const User = require('../models/user.model');
const Role = require('../models/role.model');
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
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    // Create new user
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    // Get roles
    const rolesPromise = req.body.roles
      ? Role.find({ name: { $in: req.body.roles } })
      : Role.findOne({ name: 'user' });

    const [roles] = await Promise.all([rolesPromise]);

    user.roles = Array.isArray(roles)
      ? roles.map((role) => role._id)
      : [roles._id];

    await user.save({ session });

    // Create new community
    const community = new Community({
      name: req.body.name,
      plan: req.body.plan,
      moderator: user._id,
      users: [
        {
          user: user._id,
          role: 'moderator',
        },
      ],
    });

    const folderName = exports.getBucketFolderName(req.body.name);
    const file = storage.bucket(bucketName).file(`${folderName}/`);
    await file.save(''); // Create folder

    await community.save({ session });

    // Add community._id to the communityRef for the moderator role
    const moderatorRole = await Role.findOne({ name: 'moderator' });
    user.roles.push({ _id: moderatorRole._id, communityRef: community._id });
    await user.save({ session });

    await session.commitTransaction();

    const token = jwt.sign({ id: user._id }, config.secret, {
      algorithm: 'HS256',
      expiresIn: 86400, //24h
    });

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
const createCommunity = (req, res) => {
  const { name, description, pictures, country, city, plan, owner } = req.body;

  const newCommunity = new Community({
    name,
    description,
    pictures,
    country,
    city,
    plan,
    owner,
  });

  newCommunity
    .save()
    .then((community) => {
      res.status(201).json(community);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to create community' });
    });
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
