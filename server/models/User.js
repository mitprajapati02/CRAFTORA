const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    profession: { type: String, required: true },
    profileIm: { type: String },
    age: { type: Number },
    password: { type: String, required: true },
    token: { type: String, unique: true },
    socialMediaApps: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'SocialMediaApp' },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
