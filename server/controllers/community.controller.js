const communityService = require('../services/communityService');
const roleService = require('../services/roleService');
const userService = require('../services/userService');
const jwtService = require('../services/jwtService');

const createCommunity = async (req, res) => {
  try {
    const community = await communityService.createCommunity(req.body);
    res.status(201).json(community);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create community' });
  }
};

const getCommunityById = async (req, res) => {
  try {
    const community = await communityService.getCommunityById(req.params.id);
    res.json(community);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get community' });
  }
};

const updateCommunity = async (req, res) => {
  try {
    const community = await communityService.getCommunityById(req.params.id);
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    // Check if the current user is a moderator of the community
    const isModerator = await roleService.checkUserRole(
      req.user._id,
      req.params.id,
      'moderator'
    );
    if (isModerator === false) {
      return res
        .status(403)
        .json({ message: 'Only a moderator can update the community' });
    }

    const updatedCommunity = await communityService.updateCommunity(
      req.params.id,
      req.body
    );
    res.json(updatedCommunity);
  } catch (error) {
    console.error('Failed to update community:', error);
    res.status(500).json({ message: 'Failed to update community' });
  }
};

const removeUserFromCommunity = async (req, res) => {
  try {
    const { communityId, userId: deleteUserID } = req.body;
    const { _id: requesterId } = jwtService.decodeToken(
      req.headers['x-access-token']
    );

    // Check if the current user is a moderator of the community
    const isModerator = await roleService.checkUserRoleInCommunity(
      requesterId,
      communityId,
      'Moderator'
    );
    if (!isModerator) {
      return res.status(403).json({
        message: 'Only a moderator can remove a user from a community',
      });
    }

    // Remove the user from the community
    const updatedUser = await userService.removeUserFromCommunity(
      communityId,
      deleteUserID
    );
    return res.json(updatedUser);
  } catch (error) {
    console.error('Failed to remove user from community:', error);
    return res
      .status(500)
      .json({ message: 'Failed to remove user from community' });
  }
};

module.exports = {
  createCommunity,
  getCommunityById,
  updateCommunity,
  removeUserFromCommunity,
};
