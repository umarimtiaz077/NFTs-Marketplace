// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  description: String,
  website: String,
  socialLinks: {
    facebook: String,
    twitter: String,
    instagram: String,
  },
  walletAddress: { type: String, required: true },
  profileImage: String, // URL or base64 image data
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
