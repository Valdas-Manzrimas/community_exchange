const db = require('../models');
const userService = require('./userService');
const User = db.user;
const Role = db.role;

exports.checkUserRole = async (userId, communityId, roleName) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User with id ${userId} does not exist`);
  }

  return user.communities.some(
    (c) =>
      c.community.toString() === communityId.toString() && c.role === roleName
  );
};

exports.addUserRole = async (userId, communityId, roleName) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User with id ${userId} does not exist`);
  }

  const community = await Community.findById(communityId);
  if (!community) {
    throw new Error(`Community with id ${communityId} does not exist`);
  }

  const userCommunity = user.communities.find(
    (c) => c.community.toString() === communityId.toString()
  );

  if (userCommunity) {
    userCommunity.role = roleName;
  } else {
    user.communities.push({ community: communityId, role: roleName });
  }

  await user.save();

  return user;
};

exports.removeUserRole = async (userId, communityId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User with id ${userId} does not exist`);
  }

  const communityIndex = user.communities.findIndex(
    (c) => c.community.toString() === communityId.toString()
  );

  if (communityIndex === -1) {
    throw new Error(
      `User is not a member of the community with id ${communityId}`
    );
  }

  user.communities.splice(communityIndex, 1);
  await user.save();

  return user;
};
