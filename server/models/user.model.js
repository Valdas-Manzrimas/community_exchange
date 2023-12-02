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
    password: {
      type: String,
      required: true,
    },
    communities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
      },
    ],
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        communityRef: 'Community',
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
