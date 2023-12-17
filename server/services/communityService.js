const db = require('../models');
const mongoose = require('mongoose');
const { Storage } = require('@google-cloud/storage');

const Community = db.community;

exports.joinCommunity = async (userId, communityId) => {
  const community = await Community.findById(communityId);
  community.users.push(userId);
  await community.save();

  return community;
};

const storage = new Storage({
  projectId: 'harmony-exchange',
  keyFilename: './harmony-exchange-0b2b2d6f33e8.json',
});

exports.getBucketFolderName = (communityName) => {
  return `${communityName.replace(/ /g, '-')}`;
};

const bucketName = 'harmony_communities';

exports.createCommunity = async (communityDetails, session = null) => {
  const newCommunity = new Community({
    _id: new mongoose.Types.ObjectId(),
    ...communityDetails,
    users: [communityDetails.owner],
    moderator: communityDetails.owner,
  });

  const communityName = getBucketFolderName(communityDetails.name);
  const file = storage
    .bucket(bucketName)
    .file(`${communityName}/product_images/`);
  await file.save('');

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
