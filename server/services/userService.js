const db = require('../models');
const bcrypt = require('bcryptjs');
const communityService = require('./communityService');
const roleService = require('./roleService');
const mongoose = require('mongoose');

const User = db.user;

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

exports.createUserByInvitation = async (
  userDetails,
  communityId,
  session = null
) => {
  const user = await exports.createUser(userDetails, session);

  if (communityId) {
    user.communities.push(communityId);
    await user.save();
  }

  return user;
};

exports.getUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User with id ${userId} does not exist`);
  }
  return user;
};

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

exports.deleteUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User with id ${userId} does not exist`);
  }

  await user.remove();
  return user;
};
