const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user.model');
db.role = require('./role.model');
db.product = require('./product.model');
db.order = require('./order.model');
db.community = require('./community.model');

db.ROLES = ['user', 'admin', 'moderator'];

module.exports = db;
