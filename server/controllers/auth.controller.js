// auth.controller.js
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (req.body.roles) {
      const roles = await Role.find({ name: { $in: req.body.roles } });
      user.roles = roles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: 'user' });
      user.roles = [role._id];
    }

    await user.populate('roles');

    const authorities = user.roles.map(
      (role) => 'ROLE_' + role.name.toUpperCase()
    );

    console.log('authorities:', authorities);
    await user.save();

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: 'HS256',
      expiresIn: 86400, //24h
    });

    res.status(201).json({
      message: 'User was registered successfully!',
      token: token,
      roles: authorities,
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
    console.error('Error during signin:', error);
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
