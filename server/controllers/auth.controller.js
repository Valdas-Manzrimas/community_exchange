// Filename: auth.controller.js

// TODO: add error handling
// TODO: add validation
// TODO: add logging
// TODO: add comments
// TODO: add tests
// TODO: add documentation
// TODO: add normal mail address

const config = require('../config/auth.config');
const jwtService = require('../services/jwtService');
const userService = require('../services/userService');
const invitationService = require('../services/invitationService');
const communityService = require('../services/communityService');

const sgMail = require('@sendgrid/mail');
require('dotenv').config();

exports.signup = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const token = jwtService.generateToken({ id: user._id });

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
    const { user, community, token } = await userService.createUserAndCommunity(
      req.body.user,
      req.body.community
    );

    res.status(201).json({
      message: 'User and community were registered successfully!',
      user: user._id,
      community: community._id,
      token: token,
    });
  } catch (error) {
    console.error('Error during user and community registration:', error);
    res.status(500).json({
      message: 'An error occurred during user and community registration.',
      error: error.message,
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

    if (error && error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Invitation token has expired.' });
    } else if (error && error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Invalid invitation token.' });
    } else if (error && error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
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

// SIGN OUT
exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).json({ message: 'User signed out successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'An error occurred while signing out' });
  }
};

// INVITATION CONTROLLERS
exports.sendInvitation = async (req, res) => {
  const { email, communityId } = req.body;

  const communityName = await communityService.getCommunityName(communityId);

  if (!email) {
    return res.status(400).send({ message: 'Email is required.' });
  }

  if (!communityId) {
    return res.status(400).send({ message: 'Community ID is required.' });
  }

  if (!req.user) {
    return res.status(401).send({ message: 'Unauthorized!' });
  }

  try {
    const userId = req.user._id;

    const result = await invitationService.sendInvitation(
      req.body.communityId,
      userId,
      email
    );

    // Send an email with the invitation details
    const subject = `Invitation to join ${communityName}`;
    const text = `You have been invited to join the ${communityName} community. Please click the following link to accept the invitation: ${result.url}`;

    const html = `
          <div style="text-align: center;">
            <h1 style="font-size: 24px; margin-bottom: 20px;">Invitation to join ${communityName}</h1>
            <p style="font-size: 18px; margin-bottom: 20px; text-align: left; padding: 0 20px; line-height: 1.5;">
              You have been invited to join the ${communityName} community. Please click the following link to accept the invitation:
            </p>
            <a href="${result.url}" style="background-color: #007bff; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;" >Accept Invitation</a>
          </div>
    `;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      // UPDATE TO COMPANY EMAIL ADDRESS!
      from: 'vrajaviharidas@gmail.com',
      subject,
      text,
      html,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });

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
