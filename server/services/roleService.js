const db = require('../models');
const userService = require('./userService');
const User = db.user;
const Role = db.role;

exports.checkUserRole = async (userId, roleName) => {
  const user = await userService.getUser(userId);
  return user.roles.some((role) => role.name === roleName);
};

exports.addUserRole = async (userId, roleName) => {
  const roleToAdd = await Role.findOne({ name: roleName });
  if (!roleToAdd) {
    throw new Error(`Role ${roleName} does not exist`);
  }

  const user = await User.findById(userId);
  if (!user.roles.includes(roleToAdd._id)) {
    user.roles.push(roleToAdd._id);
    await user.save();
  }

  return user;
};

exports.removeUserRole = async (userId, roleName) => {
  const roleToRemove = await Role.findOne({ name: roleName });
  if (!roleToRemove) {
    throw new Error(`Role ${roleName} does not exist`);
  }

  const user = await User.findById(userId);
  user.roles = user.roles.filter((roleId) => !roleId.equals(roleToRemove._id));
  await user.save();

  return user;
};
