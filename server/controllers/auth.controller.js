// auth.controller.js
const config = require('../config/auth.config');
const db = require('../models');
const mongoose = require('mongoose');
const { jwtDecode } = require('jwt-decode');

const User = db.user;
const Role = db.role;
const Community = db.community;
const Invitation = db.invitation;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = async (req, res, session = null) => {
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const rolesPromise = req.body.roles
      ? Role.find({ name: { $in: req.body.roles } })
      : Role.findOne({ name: 'user' });

    const [roles] = await Promise.all([rolesPromise]);

    user.roles = Array.isArray(roles)
      ? roles.map((role) => role._id)
      : [roles._id];

    if (session && session.inTransaction && session.inTransaction()) {
      await user.save({ session });
    } else {
      await user.save();
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: 'HS256',
      expiresIn: 86400, //24h
    });

    return { user, token };
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send({ message: 'Error during signup.' });
  }
};

exports.signupAndRespond = async (req, res) => {
  try {
    const { user, token } = await exports.signup(req);

    res.status(201).json({
      message: 'User was registered successfully!',
      user,
      token: token,
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    res
      .status(500)
      .json({ message: 'An error occurred during user registration.' });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Invalid Password!' });
    }

    const token = jwt.sign({ _id: user._id }, config.secret, {
      algorithm: 'HS256',
      expiresIn: 86400,
    });

    const communities = await Community.find({ users: user._id });
    const communityIds = communities.map((community) => community._id);

    req.session.token = token;

    res.status(200).send({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      communities: communityIds,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during signin.' });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    console.error('Error during signout:', err);
    res.status(500).json({ message: 'An error occurred during signout.' });
  }
};

exports.sendInvitation = async (req, res) => {
  try {
    // Check if the user is a moderator of the community
    const community = await Community.findById(req.body.communityId);
    if (!community.moderator.equals(req.user._id)) {
      return res
        .status(403)
        .send({ message: 'User is not a moderator of this community.' });
    }

    // Create a new invitation
    const invitation = new Invitation({
      email: req.body.email,
      communityId: req.body.communityId,
    });

    // Save the invitation to the database
    const savedInvitation = await invitation.save();

    const token = jwt.sign({ _id: savedInvitation._id }, config.secret, {
      expiresIn: 604800, // 1 week
    });

    savedInvitation.token = token;
    await savedInvitation.save();

    const frontendHost = 'http://127.0.0.1:5173';
    const url = `${frontendHost}/invitation?token=${token}`;
    // Send the URL to the user's email address
    // You can use a package like nodemailer to send the email
    // await sendEmail(invitation.email, 'Join our community', `Click on this link to join our community: ${url}`);

    res
      .status(200)
      .send({ message: 'Invitation sent successfully.', url: url });
  } catch (error) {
    console.error('Error sending invitation:', error);
    res.status(500).send({ message: 'Error sending invitation.' });
  }
};

exports.getInvitation = async (req, res) => {
  const token = req.query.token;

  try {
    const decoded = jwtDecode(token);
    const invitation = await Invitation.findById(decoded._id);
    const community = await Community.findById(invitation.communityId);

    if (!invitation || !community) {
      return res
        .status(404)
        .send({ message: 'Invitation or community not found.' });
    }

    res.json({
      email: invitation.email,
      communityName: community.name,
    });
  } catch (error) {
    console.error('Error fetching invitation details:', error);
    res.status(500).send({ message: 'Error fetching invitation details.' });
  }
};
