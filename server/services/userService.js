const mongoose = require('mongoose');
const db = require('../models');
const bcrypt = require('bcryptjs');
const communityService = require('./communityService');
const roleService = require('./roleService');
const jwtService = require('./jwtService');
const yup = require('yup');

const Community = db.community;
const User = db.user;

const changePasswordSchema = yup.object().shape({
  // Used in changePassword
  newPassword: yup
    .string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

// SIGNIN User
exports.signin = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error('User Not found.');
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    throw new Error('Invalid Password!');
  }

  const communities = await Community.find({ users: user._id });
  const communityIds = communities.map((community) => community._id);

  const token = jwtService.generateToken({ _id: user._id });

  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    communities: communityIds,
    token: token,
  };
};

// CREATE User
exports.createUser = async (userDetails, session = null) => {
  const user = new User({
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    email: userDetails.email,
    password: bcrypt.hashSync(userDetails.password, 8),
    communities: [],
  });
  // save user
  try {
    if (session?.inTransaction?.()) {
      await user.save({ session });
    } else {
      await user.save();
    }
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }

  return user;
};

// CREATE User and Community
exports.createUserAndCommunity = async (userDetails, communityDetails) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const user = await this.createUser(userDetails, session);
  communityDetails.owner = user._id;
  const community = await communityService.createCommunity(
    communityDetails,
    session
  );

  // Add the community id to the user
  user.communities.push(community._id);
  await user.save({ session });

  await session.commitTransaction();

  // add user roles
  if (userDetails.roles) {
    for (const roleName of userDetails.roles) {
      await roleService.addUserRole(user._id, roleName);
    }
  } else {
    await roleService.addUserRole(user._id, 'user');
    await roleService.addUserRole(user._id, 'moderator');
  }

  return { user, community };
};

// CREATE User by invitation
exports.createUserByInvitation = async (
  userDetails,
  communityId,
  session = null
) => {
  const user = await exports.createUser(userDetails, session);

  if (communityId) {
    user.communities.push(communityId);
    await user.save();

    await communityService.joinCommunity(user._id, communityId);
  }
  await roleService.addUserRole(user._id, 'user');
  return user;
};

// GET user by id
exports.getUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User with id ${userId} does not exist`);
  }
  return user;
};

// UPDATE user
exports.updateUser = async (userId, userDetails) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User with id ${userId} does not exist`);
  }

  user.firstName = userDetails.firstName || user.firstName;
  user.lastName = userDetails.lastName || user.lastName;
  user.email = userDetails.email || user.email;
  if (userDetails.password) {
    user.password = bcrypt.hashSync(userDetails.password, 8);
  }

  await user.save();
  return user;
};

// DELETE user
exports.deleteUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User with id ${userId} does not exist`);
  }

  await user.remove();
  return user;
};

// Change password
exports.changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found.');
  }

  const currentPasswordMatch = bcrypt.compareSync(
    currentPassword,
    user.password
  );

  if (!currentPasswordMatch) {
    throw new Error('Current password is incorrect.');
  }

  // Validate the new password
  await changePasswordSchema.validate({ newPassword });

  user.password = bcrypt.hashSync(newPassword, 8);
  await user.save();
};
