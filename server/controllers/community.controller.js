const communityService = require('../services/communityService');
const roleService = require('../services/roleService');

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

module.exports = {
  createCommunity,
  getCommunityById,
  updateCommunity,
};
