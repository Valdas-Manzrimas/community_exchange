const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    communityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Community',
      required: true,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

invitationSchema.pre('save', function (next) {
  this.increment();
  next();
});

const Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;
