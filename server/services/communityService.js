const db = require('../models');
const mongoose = require('mongoose');
const cloudService = require('../services/cloudService');

const Community = db.community;

exports.joinCommunity = async (userId, communityId) => {
  const community = await Community.findById(communityId);
  community.users.push(userId);
  await community.save();

  return community;
};

exports.createCommunity = async (communityDetails, session = null) => {
  const existingCommunity = await Community.findOne({
    name: communityDetails.name,
  });
  if (existingCommunity) {
    throw new Error(
      'Community with this name already exists. Name must be unique.'
    );
  }

  const newCommunity = new Community({
    _id: new mongoose.Types.ObjectId(),
    ...communityDetails,
    users: [communityDetails.owner],
    moderator: communityDetails.owner,
  });

  const communityName = cloudService.getBucketFolderName(communityDetails.name);
  await cloudService.createFolder(`${communityName}/product_images/`);

  if (session?.inTransaction?.()) {
    await newCommunity.save({ session });
  } else {
    await newCommunity.save();
  }

  return newCommunity;
};

exports.getCommunityById = async (id) => {
  const community = await Community.findById(id).populate('moderator', '_id');
  if (!community) {
    throw new Error(`Community with id ${id} does not exist`);
  }
  return community;
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
