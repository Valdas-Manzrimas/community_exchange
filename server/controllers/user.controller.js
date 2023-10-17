//user.controller.js
const bcrypt = require('bcryptjs');
const User = require('../models/user.model.js');
const Role = require('../models/role.model');

const yup = require('yup');

const changePasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    const { currentPassword, newPassword } = req.body;

    const currentPasswordMatch = bcrypt.compareSync(
      currentPassword,
      user.password
    );

    if (!currentPasswordMatch) {
      return res
        .status(401)
        .json({ message: 'Current password is incorrect.' });
    }

    try {
      await changePasswordSchema.validate({ newPassword });

      user.password = bcrypt.hashSync(newPassword, 8);
      await user.save();

      res.status(200).json({ message: 'Password changed successfully!' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Error changing password.' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().exec();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send({ message: 'Error fetching users.' });
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

exports.userBoard = (req, res) => {
  User.findById(req.userId)
    .select('-password')
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
      res.status(500).send({ message: 'Error fetching user data.' });
    });
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
    const currentUser = await User.findById(req.userId).exec();
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
    return res.status(500).send({ message: err.message });
  }
};
