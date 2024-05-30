const db = require('../models');
const mongoose = require('mongoose');
const cloudService = require('../services/cloudService');

const Community = db.community;
const User = db.user;

exports.joinCommunity = async (userId, communityId) => {
  const community = await Community.findById(communityId);
  community.users.push(userId);
  await community.save();

  return community;
};

exports.createCommunity = async (
  { name, owner, ...communityDetails },
  session = null
) => {
  const existingCommunity = await Community.findOne({ name });
  if (existingCommunity)
    throw new Error(
      'Community with this name already exists. Name must be unique.'
    );

  const community = new Community({
    _id: new mongoose.Types.ObjectId(),
    name,
    owner,
    users: [owner],
    ...communityDetails,
  });

  const bucketFolderName = cloudService.getBucketFolderName(name);
  await cloudService.createFolder(`${bucketFolderName}/product_images/`);

  if (session?.inTransaction?.()) {
    await community.save({ session });
  } else {
    await community.save();
  }

  return community;
};

exports.getCommunityById = async (id) => {
  const community = await Community.findById(id);
  if (!community) {
    throw new Error(`Community with id ${id} does not exist`);
  }
  return community;
};

exports.getAllUserCommunities = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const communities = await Community.find({
    users: { $in: [userId] },
  }).select('name _id');
  return communities;
};

exports.updateCommunity = async (id, communityDetails) => {
  const community = await Community.findByIdAndUpdate(id, communityDetails, {
    new: true,
  });
  if (!community) {
    throw new Error(`Community with id ${id} does not exist`);
  }
  return community;
};

exports.removeUserFromCommunity = async (communityId, userId, requesterId) => {
  // Check if the requester is a moderator
  const requester = await User.findById(requesterId);
  const requesterRoleInCommunity = requester.communities.find(
    (c) => c.community.toString() === communityId.toString()
  );
  if (
    !requesterRoleInCommunity ||
    requesterRoleInCommunity.role !== 'Moderator'
  ) {
    throw new Error('Only a moderator can remove a user from a community');
  }

  const community = await Community.findById(communityId);
  if (!community) {
    throw new Error('Community not found');
  }

  const userIndex = community.members.indexOf(userId);
  if (userIndex > -1) {
    community.members.splice(userIndex, 1);
    await community.save();
  }

  return community;
};

exports.getCommunityName = async (id) => {
  const community = await Community.findById(id);
  if (!community) {
    throw new Error(`Community with id ${id} does not exist`);
  }
  return community.name;
};
