const config = require('../config/auth.config');
const Community = require('../models/community.model');
const Invitation = require('../models/invitation.model');
const jwtService = require('./jwtService');

exports.sendInvitation = async (communityId, userId, email) => {
  const community = await Community.findById(communityId);
  if (!community.moderator.equals(userId)) {
    throw new Error('User is not a moderator of this community.');
  }

  const invitation = new Invitation({
    email: email,
    communityId: communityId,
    invitedBy: userId,
  });

  const savedInvitation = await invitation.save();

  const token = jwtService.generateToken(
    { _id: savedInvitation._id },
    config.secret,
    {
      expiresIn: 604800, // 1 week
    }
  );

  savedInvitation.token = token;
  await savedInvitation.save();

  return {
    message: 'Invitation sent successfully.',
    url: `http://127.0.0.1:5173/invitation?token=${token}`,
  };
};

exports.getInvitationDetails = async (invitationId) => {
  const invitation = await Invitation.findById(invitationId).populate(
    'communityId invitedBy',
    'name firstName lastName'
  );

  if (!invitation) {
    throw new Error('Invitation not found.');
  }

  return {
    email: invitation.email,
    communityName: invitation.communityId.name,
    communityId: invitation.communityId._id,
    invitedBy: `${invitation.invitedBy.firstName} ${invitation.invitedBy.lastName}`,
  };
};

exports.acceptInvitation = async (token) => {
  const decoded = jwtService.decodeToken(token);
  const invitation = await Invitation.findById(decoded._id);

  if (!invitation || invitation.used) {
    throw new Error('Invalid or used invitation.');
  }

  invitation.used = true;
  await invitation.save();

  return { message: 'Invitation accepted.' };
};

exports.markInvitationAsUsed = async (invitationToken) => {
  const decoded = jwtService.decodeToken(invitationToken);
  const invitation = await Invitation.findById(decoded._id);
  if (!invitation) {
    throw new Error('Invitation not found.');
  }
  invitation.used = true;
  await invitation.save();
};
