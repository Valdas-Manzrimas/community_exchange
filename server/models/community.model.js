const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: Text,
  },
  pictures: [
    {
      type: String,
    },
  ],
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  users: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        role: {
          type: String,
          enum: ['moderator', 'member'],
          default: 'member',
        },
      },
    },
  ],
  plan: {
    type: String,
    required: true,
  },
  moderator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
