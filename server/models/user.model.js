const mongoose = require('mongoose');

const generateId = () => {
  const letters = [...Array(5)]
    .map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 97))
    .join('');
  const numbers = [...Array(5)]
    .map(() => Math.floor(Math.random() * 10))
    .join('');
  return letters + numbers;
};

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: generateId,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    communities: [
      {
        community: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Community',
        },
        role: {
          type: String,
          enum: ['user', 'moderator', 'admin'],
          default: 'user',
        },
        // user offering
        orders: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
          },
        ],
        // requested for exchange
        requests: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  this.increment();
  next();
});

module.exports = mongoose.model('User', userSchema);
