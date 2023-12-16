// Filename: auth.controller.js

// TODO: add error handling
// TODO: add validation
// TODO: add logging
// TODO: add comments
// TODO: add tests
// TODO: add documentation

const config = require('../config/auth.config');
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = db.user;
const Role = db.role;
const Community = db.community;
const Invitation = db.invitation;

exports.signup = async (req, session = null) => {
  let communityId;
  if (req.body.token) {
    const decoded = jwt.decode(req.body.token);
    const invitation = await Invitation.findOne({ _id: decoded._id });
    communityId = invitation.communityId;
  }

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    communities: [],
  });

  const roles = req.body.roles
    ? await Role.find({ name: { $in: req.body.roles } })
    : [await Role.findOne({ name: 'user' })];

  user.roles = roles.map((role) => role._id);

  if (session?.inTransaction?.()) {
    await user.save({ session });
  } else {
    await user.save();
  }

  if (communityId) {
    // joining community with user
    const community = await Community.findById(communityId);
    community.users.push(user._id);
    await community.save();

    user.communities.push(community._id);
    user.save();
  }

  const token = jwt.sign({ id: user.id }, config.secret, {
    algorithm: 'HS256',
    expiresIn: 86400, //24h
  });

  return { user, token };
};

exports.signupAndRespond = async (req, res) => {
  try {
    const invitationToken = req.body.token;
    let communityId = null;

    if (invitationToken) {
      const decoded = jwt.decode(invitationToken);
      const invitation = await Invitation.findOne({ _id: decoded._id });

      if (invitation.used) {
        return res
          .status(400)
          .json({ message: 'This invitation has already been used.' });
      }

      communityId = invitation.communityId;
      invitation.used = true;
      await invitation.save();
    }

    const community = await Community.findById(communityId);

    req.body.communityId = communityId;
    const { user, token } = await exports.signup(req);

    let response = {
      message: 'User was registered successfully!',
      user,
      token: token,
    };

    res.status(201).json(response);
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
    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Invalid Password!' });
    }

    const communities = await Community.find({ users: user._id });
    const communityIds = communities.map((community) => community._id);

    const token = jwt.sign({ _id: user._id }, config.secret, {
      algorithm: 'HS256',
      expiresIn: 86400,
    });

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
