const communityService = require('../services/communityService');

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
    const community = await communityService.updateCommunity(
      req.params.id,
      req.body
    );
    res.json(community);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update community' });
  }
};

module.exports = {
  createCommunity,
  getCommunityById,
  updateCommunity,
};
