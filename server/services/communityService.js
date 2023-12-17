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
  const community = await Community.findById(id).populate('moderator', 'id');
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
