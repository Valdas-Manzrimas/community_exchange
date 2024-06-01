const mongoose = require('mongoose');

const generateId = () => {
  const numbers = [...Array(10)]
    .map(() => Math.floor(Math.random() * 10))
    .join('');
  return numbers;
};

const communitySchema = new mongoose.Schema(
  {
    harmonyId: {
      type: String,
      default: generateId,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    mission: {
      title: { default: 'Our Mission', type: String },
      content: { default: 'Our mission is to...', type: String },
    },
    values: {
      title: { default: 'Our Values', type: String },
      content: { default: 'Our values are...', type: String },
    },
    settings: {
      type: Object,
      required: true,
      default: {
        plan: 'free',
        allowPosts: true,
        allowEvents: true,
        allowPictures: true,
        allowSharePosts: true,
        allowShareEvents: true,
        allowMission: true,
        allowValues: true,
      },
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        role: {
          type: String,
          enum: ['admin', 'moderator', 'user'],
          default: 'user',
        },
      },
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    plan: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
  { versionKey: '__v' }
);

communitySchema.pre('save', function (next) {
  this.increment();
  next();
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
