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
const invitationService = require('../services/invitationService');
const db = require('../models');
const jwt = require('jsonwebtoken');

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
    const invitation = await invitationService.getInvitationDetails(
      decoded._id
    );

    if (invitation.used) {
      return res
        .status(400)
        .json({ message: 'This invitation has already been used.' });
    }

    const communityId = invitation.communityId;
    await invitationService.markInvitationAsUsed(invitationToken);

    const user = await userService.createUserByInvitation(
      req.body,
      communityId
    );
    const token = jwtService.generateToken({ _id: user._id });

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
  return res.status(204).send();
};

// INVITATION CONTROLLERS
exports.sendInvitation = async (req, res) => {
  try {
    const result = await invitationService.sendInvitation(
      req.body.communityId,
      req.user._id,
      req.body.email
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getInvitation = async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) {
      return res.status(400).send({ message: 'Token is required.' });
    }

    const decoded = jwtService.verifyToken(token, config.secret);
    if (!decoded || !decoded._id) {
      return res.status(400).send({ message: 'Invalid token.' });
    }

    const result = await invitationService.getInvitationDetails(decoded._id);
    res.json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.acceptInvitation = async (req, res) => {
  try {
    const result = await invitationService.acceptInvitation(req.body.token);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
