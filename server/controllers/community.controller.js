const communityService = require('../services/communityService');
const roleService = require('../services/roleService');
const userService = require('../services/userService');

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
    const isModerator = await roleService.checkUserRoleInCommunity(
      req.user.id,
      req.params.id,
      'moderator'
    );
    if (!isModerator) {
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
    res.status(500).json({ message: 'Failed to update community' });
  }
};

const removeUserFromCommunity = async (req, res) => {
  try {
    const communityId = req.body.communityId;
    const userId = req.params.userId;

    // Check if the current user is a moderator of the community
    const isModerator = await roleService.checkUserRoleInCommunity(
      req.user.id,
      communityId,
      'moderator'
    );
    if (!isModerator) {
      return res.status(403).json({
        message: 'Only a moderator can remove a user from a community',
      });
    }

    const user = await userService.getUser(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the user from the community
    const updatedCommunity = await communityService.removeUserFromCommunity(
      communityId,
      userId
    );
    res.json(updatedCommunity);
  } catch (error) {
    console.error('Failed to remove user from community:', error);
    res.status(500).json({ message: 'Failed to remove user from community' });
  }
};

module.exports = {
  createCommunity,
  getCommunityById,
  updateCommunity,
  removeUserFromCommunity,
};
