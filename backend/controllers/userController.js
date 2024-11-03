const User = require("../models/User");

// controllers/userController.js
exports.registerOrLoginUser = async (req, res) => {
  try {
    const walletAddress = req.body.walletAddress.toLowerCase(); // Convert to lowercase

    // Check if the user already exists
    let user = await User.findOne({ walletAddress });
    if (!user) {
      // Create a new user with empty fields except for walletAddress
      user = new User({ walletAddress, username: "", email: "", description: "", website: "" });
      await user.save();
      return res.status(201).json({ message: "User registered successfully", user });
    }

    // If the user exists, return the user data without creating a new entry
    res.status(200).json({ message: "User already exists", user });
  } catch (error) {
    res.status(500).json({ message: "Error registering or logging in user", error });
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const walletAddress = req.body.walletAddress.toLowerCase(); // Convert to lowercase

    const {username, email, description, website, socialLinks, profileImage } = req.body;

    // Log the received data to ensure it's coming through correctly
    console.log("Received data:", {
      walletAddress,
      username,
      email,
      description,
      website,
      socialLinks,
      profileImage,
    });

    // Check if walletAddress is provided
    if (!walletAddress) {
      console.log("No wallet address provided.");
      return res.status(400).json({ message: "Wallet address is required" });
    }

    // Find user by walletAddress and update
    const updatedUser = await User.findOneAndUpdate(
      { walletAddress },
      {
        username,
        email,
        description,
        website,
        socialLinks,
        profileImage,
      },
      { new: true }
    );

    // Log the result of findOneAndUpdate
    console.log("Update result:", updatedUser);

    if (!updatedUser) {
      console.log("User not found for wallet address:", walletAddress);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Profile updated successfully for user:", updatedUser);
    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile", error });
  }
};



exports.followUser = async (req, res) => {
  try {
    const { userId, followId } = req.body; // userId is the logged-in user, followId is the user to follow

    const user = await User.findById(userId);
    const userToFollow = await User.findById(followId);

    if (!user || !userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already following
    if (!user.following.includes(followId)) {
      user.following.push(followId);
      await user.save();
    }

    if (!userToFollow.followers.includes(userId)) {
      userToFollow.followers.push(userId);
      await userToFollow.save();
    }

    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error following user", error });
  }
};
