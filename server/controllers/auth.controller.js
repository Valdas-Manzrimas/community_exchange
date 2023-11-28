// auth.controller.js
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = async (req, session) => {
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

  await user.save({ session });

  const token = jwt.sign({ id: user.id }, config.secret, {
    algorithm: 'HS256',
    expiresIn: 86400, //24h
  });

  return { user, token };
};

exports.signupAndRespond = async (req, res) => {
  try {
    const { user, token } = await exports.signup(req);

    res.status(201).json({
      message: 'User was registered successfully!',
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
    const user = await User.findOne({ email: req.body.email }).populate(
      'roles',
      '-__v'
    );

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

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: 'HS256',
      expiresIn: 86400,
    });

    const authorities = user.roles.map(
      (role) => 'ROLE_' + role.name.toUpperCase()
    );

    req.session.token = token;

    res.status(200).send({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: authorities,
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
