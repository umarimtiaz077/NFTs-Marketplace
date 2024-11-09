<<<<<<< HEAD
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
=======
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  username: { type: String, default: "" },
  email: { type: String, default: "" },
  description: { type: String, default: "" },
  website: { type: String, default: "" },
  socialLinks: {
    facebook: { type: String, default: "" },
    twitter: { type: String, default: "" },
    instagram: { type: String, default: "" },
  },
  profileImage: { type: String, default: "" },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
}, { timestamps: true, collection: 'users' }); 
>>>>>>> secondary/main

module.exports = mongoose.model('User', userSchema);
