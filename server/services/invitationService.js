const db = require('../models');
const jwt = require('jsonwebtoken');

const Invitation = db.invitation;

exports.getInvitation = async (id) => {
  return await Invitation.findOne({ _id: id });
};

exports.markInvitationAsUsed = async (invitation) => {
  invitation.used = true;
  await invitation.save();
};
