// Filename: auth.controller.js

// TODO: add error handling
// TODO: add validation
// TODO: add logging
// TODO: add comments
// TODO: add tests
// TODO: add documentation

const config = require('../config/auth.config');
const jwtService = require('../services/jwtService');
const userService = require('../services/userService');
const db = require('../models');
const jwt = require('jsonwebtoken');

const Community = db.community;
const Invitation = db.invitation;

exports.signup = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const token = jwtService.generateToken(user);

    res.status(201).json({
      message: 'User was registered successfully!',
      user,
      token,
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    res
      .status(500)
      .json({ message: 'An error occurred during user registration.' });
  }
};

exports.signupUserAndCommunity = async (req, res) => {
  try {
    const { user, community } = await userService.createUserAndCommunity(
      req.body.user,
      req.body.community
    );

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    res.status(201).json({
      message: 'User and community were registered successfully!',
      user: user._id,
      community: community._id,
      token: token,
    });
  } catch (error) {
    console.error('error', error),
      res.status(500).json({
        message: 'An error occurred during user and community registration.',
      });
  }
};

exports.signupByInvitation = async (req, res) => {
  try {
    const invitationToken = req.body.token;

    if (!invitationToken) {
      return res.status(400).json({ message: 'Invitation token is required.' });
    }

    const decoded = jwtService.decodeToken(invitationToken);
    const invitation = await invitationService.getInvitation(decoded._id);

    if (invitation.used) {
      return res
        .status(400)
        .json({ message: 'This invitation has already been used.' });
    }

    const communityId = invitation.communityId;
    invitationService.markInvitationAsUsed(invitation);

    const user = await userService.createUserByInvitation(
      req.body,
      communityId
    );
    const token = userService.generateToken(user);

    res.status(201).json({
      message: 'User was registered successfully!',
      user,
      token,
      community: communityId,
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    res
      .status(500)
      .json({ message: 'An error occurred during user registration.' });
  }
};

// SIGN IN
exports.signin = async (req, res) => {
  try {
    const user = await userService.signin(req.body.email, req.body.password);
    req.session.token = user.token;
    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  req.session = null;
  return res.status(200).send({ message: "You've been signed out!" });
};

exports.sendInvitation = async (req, res) => {
  try {
    const community = await Community.findById(req.body.communityId);
    if (!community.moderator.equals(req.user._id)) {
      return res
        .status(403)
        .send({ message: 'User is not a moderator of this community.' });
    }

    const invitation = new Invitation({
      email: req.body.email,
      communityId: req.body.communityId,
      invitedBy: req.user._id,
    });

    const savedInvitation = await invitation.save();

    const token = jwt.sign({ _id: savedInvitation._id }, config.secret, {
      expiresIn: 604800, // 1 week
    });

    savedInvitation.token = token;
    await savedInvitation.save();

    res.status(200).send({
      message: 'Invitation sent successfully.',
      url: `http://127.0.0.1:5173/invitation?token=${token}`,
    });
  } catch (error) {
    res.status(500).send({ message: 'Error sending invitation.' });
  }
};

exports.getInvitation = async (req, res) => {
  try {
    const decoded = jwt.decode(req.query.token);
    const invitation = await Invitation.findById(decoded._id).populate(
      'communityId invitedBy',
      'name firstName lastName'
    );

    if (!invitation) {
      return res.status(404).send({ message: 'Invitation not found.' });
    }

    res.json({
      email: invitation.email,
      communityName: invitation.communityId.name,
      communityId: invitation.communityId._id,
      invitedBy: `${invitation.invitedBy.firstName} ${invitation.invitedBy.lastName}`,
    });
  } catch (error) {
    res.status(500).send({ message: 'Error getting invitation.' });
  }
};

exports.acceptInvitation = async (req, res) => {
  try {
    const decoded = jwt.decode(req.body.token);
    const invitation = await Invitation.findById(decoded._id);

    if (!invitation || invitation.used) {
      return res.status(400).send({ message: 'Invalid or used invitation.' });
    }

    invitation.used = true;
    await invitation.save();

    res.status(200).send({ message: 'Invitation accepted.' });
  } catch (error) {
    res.status(500).send({ message: 'Error accepting invitation.' });
  }
};
