const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: [true, 'Please provide a team name'],
    trim: true,
  },
  leaderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  inviteCode: {
    type: String,
    required: true,
    unique: true,
  },
  teamCode: {
    type: String,
    required: true,
    unique: true,
  },
  maxSize: {
    type: Number,
    default: 4,
  },
  college: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Validate team size
teamSchema.methods.canAddMember = function () {
  return this.members.length < this.maxSize;
};

// Get member count
teamSchema.methods.getMemberCount = function () {
  return this.members.length;
};

module.exports = mongoose.model('Team', teamSchema);
