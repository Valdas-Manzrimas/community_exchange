const db = require('../models');
const bcrypt = require('bcryptjs');

const roleService = require('./roleService');

const User = db.user;

exports.createUser = async (userDetails, session = null) => {
  const user = new User({
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    email: userDetails.email,
    password: bcrypt.hashSync(userDetails.password, 8),
    communities: [],
  });

  if (userDetails.roles) {
    for (const roleName of userDetails.roles) {
      await roleService.addUserRole(user._id, roleName);
    }
  } else {
    await roleService.addUserRole(user._id, 'user');
  }

  if (session?.inTransaction?.()) {
    await user.save({ session });
  } else {
    await user.save();
  }

  return user;
};

exports.createUserByInvitation = async (
  userDetails,
  communityId,
  session = null
) => {
  const user = await exports.createUser(userDetails, session);

  if (communityId) {
    user.communities.push(communityId);
    await user.save();
  }

  return user;
};
