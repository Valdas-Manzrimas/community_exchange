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
          enum: ['moderator', 'member'],
          default: 'member',
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
  },
  { timestamps: true }
);

communitySchema.pre('save', function (next) {
  this.increment();
  next();
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
