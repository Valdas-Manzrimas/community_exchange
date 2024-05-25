const config = require('../config/auth.config');
const { sendInvitationSchema } = require('../middlewares/yupVerification');
const Community = require('../models/community.model');
const Invitation = require('../models/invitation.model');
const User = require('../models/user.model');
const jwtService = require('./jwtService');
const roleService = require('./roleService');

exports.sendInvitation = async (communityId, userId, email) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const community = await Community.findById(communityId);
    if (!community) {
      throw new Error('Community not found');
    }

    // Check if the user is already a member of the community
    const isMember = await User.exists({
      email,
      'communities.community': communityId,
    });

    if (isMember) {
      throw new Error('User is already a member of the community');
    }

    // Check if the user has already received an invitation to join the community
    const existingInvitation = await Invitation.findOne({
      email,
      communityId,
      used: true,
    });
    if (existingInvitation) {
      throw new Error(
        'User has already received an invitation to join the community'
      );
    }

    const invitation = new Invitation({
      email: email,
      communityId: communityId,
      invitedBy: userId,
    });

    // Create a new invitation
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
  } catch (error) {
    if (invitation) {
      await invitation.delete();
    }
    throw new Error(error.message);
  }
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
