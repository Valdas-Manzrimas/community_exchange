//user.controller.js
const User = require('../models/user.model.js');
const Role = require('../models/role.model');
const userService = require('../services/userService');

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
    const user = await User.findById(req.userId).exec();

    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    const { firstName, lastName, email } = req.body;

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    await user.save();

    res.status(200).json({ message: 'User updated successfully!' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send({ message: 'Error updating user.' });
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(req.userId).exec();

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
    // check if current user is admin by role id
    if (!currentUser.roles.includes('64aebb129b7ce08056d39f59')) {
      return res.status(403).send({ message: 'Unauthorized.' });
    }

    const roleObj = await Role.findOne({ name: role }).exec();

    if (!roleObj) {
      return res.status(404).send({ message: 'Role not found.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { roles: [roleObj._id] },
      { new: true }
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
