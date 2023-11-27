const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const User = require('../models/user.model');
const Role = require('../models/role.model');

const Community = require('../models/community.model');

exports.createCommunityAndUser = async (req, res) => {
  try {
    // Create new user
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (req.body.roles) {
      const roles = await Role.find({ name: { $in: req.body.roles } });
      user.roles = roles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: 'user' });
      user.roles = [role._id];
    }

    await user.populate('roles');

    const authorities = user.roles.map(
      (role) => 'ROLE_' + role.name.toUpperCase()
    );

    await user.save();

    // Create new community
    const community = new Community({
      name: req.body.communityName,
      plan: req.body.plan,
      moderator: user._id,
      users: [
        {
          user: user._id,
          role: 'moderator',
        },
      ],
    });

    await community.save();

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: 'HS256',
      expiresIn: 86400, //24h
    });

    res.status(201).json({
      message: 'User and community were registered successfully!',
      token: token,
      roles: authorities,
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
  createCommunity,
  updateCommunity,
  deleteCommunity,
};
