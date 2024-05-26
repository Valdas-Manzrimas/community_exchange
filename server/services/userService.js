const mongoose = require('mongoose');
const db = require('../models');
const bcrypt = require('bcryptjs');
const communityService = require('./communityService');
const roleService = require('./roleService');
const jwtService = require('./jwtService');
const yup = require('yup');
const {
  createUserSchema,
  loginSchema,
} = require('../middlewares/yupVerification');

const Community = db.community;
const User = db.user;

const changePasswordSchema = yup.object().shape({
  // Used in changePassword
  newPassword: yup
    .string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

// SIGNIN User
exports.signin = async (email, password) => {
  // yup validation
  try {
    await loginSchema.validate({ email, password });
  } catch (error) {
    throw new Error(error);
  }
  // ...
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error('User Not found.');
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    throw new Error('Invalid Password!');
  }

  const communities = await Community.find({ users: user._id });
  const communityIds = communities.map((community) => community._id);

  const token = jwtService.generateToken({ _id: user._id });

  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    country: user.country,
    city: user.city,
    communities: communityIds,
    token: token,
  };
};

// CREATE User
exports.createUser = async (userDetails, session = null) => {
  const existingUser = await User.findOne({ email: userDetails.email });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const user = new User({
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    email: userDetails.email,
    phone: userDetails.phone,
    city: userDetails.city,
    country: userDetails.country,
    password: bcrypt.hashSync(userDetails.password, 8),
    communities: [],
  });
  // save user
  try {
    await createUserSchema.validate(user, { abortEarly: false });

    if (session?.inTransaction?.()) {
      await user.save({ session });
    } else {
      await user.save();
    }
  } catch (error) {
    // console.error('Error saving user:', error);
    const validationErrors = error.inner.map((err) => ({
      field: err.path,
      message: err.message,
    }));
    throw new Error(
      'Validation errors occurred: ' + JSON.stringify(validationErrors)
    );
  }

  return user;
};

// CREATE User and Community
exports.createUserAndCommunity = async (userDetails, communityDetails) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const user = await this.createUser(userDetails, session);
  try {
    const community = await communityService.createCommunity(
      {
        name: communityDetails.name,
        owner: user._id,
        ...communityDetails,
      },
      session
    );

    user.communities.push({ _id: community._id, role: 'admin' });
    await user.save({ session });

    const token = jwtService.generateToken({ id: user._id });

    await session.commitTransaction();

    return { user, community, token };
  } catch (error) {
    await session.abortTransaction(); // Rollback the transaction in case of error
    throw error; // Propagate the error back to the calling function
  } finally {
    session.endSession(); // End the session regardless of success or failure
  }
};

// CREATE User by invitation
exports.createUserByInvitation = async (
  inviteeDetails,
  communityId,
  session = null
) => {
  const user = await this.createUser(inviteeDetails, session);

  if (communityId) {
    await communityService.joinCommunity(user._id, communityId);
    user.communities.push({ _id: communityId, role: 'user' });
  }

  await user.save();
  return user;
};

// Refactored code to use standardized variable names, removed debugging statements, improved readability and removed redundant information.

// GET user by id
exports.getUser = (userId) => {
  return User.findById(userId);
};

// UPDATE user
exports.updateUser = async (userId, userDetails) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User with id ${userId} does not exist`);
  }

  user.firstName = userDetails.firstName || user.firstName;
  user.lastName = userDetails.lastName || user.lastName;
  user.email = userDetails.email || user.email;
  user.phone = userDetails.phone || user.phone;
  user.city = userDetails.city || user.city;
  user.country = userDetails.country || user.country;

  if (userDetails.password) {
    user.password = bcrypt.hashSync(userDetails.password, 8);
  }

  await user.save();
  return user;
};

// DELETE user
exports.deleteUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User with id ${userId} does not exist`);
  }

  await user.remove();
  return user;
};

// Change password
exports.changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found.');
  }

  const currentPasswordMatch = bcrypt.compareSync(
    currentPassword,
    user.password
  );

  if (!currentPasswordMatch) {
    throw new Error('Current password is incorrect.');
  }

  // Validate the new password
  await changePasswordSchema.validate({ newPassword });

  user.password = bcrypt.hashSync(newPassword, 8);
  await user.save();
};

// GET ALL COMMMUNITY MEMBERS
exports.getAllCommunityMembers = async (communityId) => {
  const users = await User.find({ community: communityId })
    .populate('communities')
    .select('firstName lastName email communities');
  return users;
};
