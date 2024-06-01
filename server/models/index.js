const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user.model');
db.role = require('./role.model');
db.product = require('./product.model');
db.order = require('./order.model');
db.community = require('./community.model');
db.invitation = require('./invitation.model');
db.post = require('./post.model');
db.event = require('./event.model');
db.comment = require('./comment.model');

db.ROLES = ['user', 'admin', 'moderator'];

module.exports = db;
