//user.controller.js
const User = require('../models/user.model.js');
const Role = require('../models/role.model');
const userService = require('../services/userService');
const { mongoose } = require('../models/index.js');

exports.changePassword = async (req, res) => {
  try {
    await userService.changePassword(
      req.user._id,
      req.body.currentPassword,
      req.body.newPassword
    );
    res.status(200).json({ message: 'Password changed successfully!' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCommunityMembers = async (req, res) => {
  try {
    const { communityId } = req.params.communityId;
    const users = await userService.getAllCommunityMembers(communityId);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching community members:', error);
    res.status(500).send({ message: 'Error fetching community members.' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userToUpdate = await User.findById(req.user._id).exec();

    if (!userToUpdate) {
      return res.status(404).send({ message: 'User not found.' });
    }

    const updatedUserFields = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      // email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      country: req.body.country,
    };

    Object.keys(updatedUserFields).forEach((key) => {
      if (updatedUserFields[key]) {
        userToUpdate[key] = updatedUserFields[key];
      }
    });

    await userToUpdate.save();

    res.status(200).json({ message: 'User updated successfully!' });
  } catch (error) {
    res.status(500).send({ message: 'Error updating user.' });
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId).exec();

    if (!deletedUser) {
      return res.status(404).send({ message: 'User not found.' });
    }

    res.status(200).send({ message: 'User deleted successfully.' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.userBoard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password').exec();

    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send({ message: 'Error fetching user data.' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).exec();

    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send({ message: 'Error fetching user data.' });
  }
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.');
};

// requires userId and role name in request body
exports.setUserRole = async (req, res) => {
  const { userId, role } = req.body;

  try {
    const currentUser = await User.findById(req.user._id).exec();
    const communityId = req.body.communityId;
    const userCommunities = currentUser.communities.filter(
      (community) => community._id.toString() === communityId
    );

    // check if current user is admin by role id
    if (userCommunities.length === 0 || userCommunities[0].role !== 'admin') {
      return res.status(403).send({ message: 'Unauthorized.' });
    }

    const roleObj = await Role.findOne({ name: role }).exec();

    if (!roleObj) {
      return res.status(404).send({ message: 'Role not found.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          'communities.$[elem].role': role,
        },
      },
      {
        arrayFilters: [
          {
            'elem._id': new mongoose.Types.ObjectId(communityId),
          },
        ],
        new: true,
      }
    ).exec();

    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found.' });
    }

    res.status(200).send({ message: 'User role updated successfully.' });
  } catch (err) {
    console.error('Error updating user role:', err);
    return res.status(500).send({ message: 'Internal Server Error.' });
  }
};
