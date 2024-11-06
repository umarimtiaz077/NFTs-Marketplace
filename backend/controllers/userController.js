const User = require("../models/User");

exports.registerOrLoginUser = async (req, res) => {
  try {
    const walletAddress = req.body.walletAddress.toLowerCase();

    let user = await User.findOne({ walletAddress });
    if (!user) {
      user = new User({ walletAddress, username: "", email: "", description: "", website: "" });
      await user.save();
      return res.status(201).json({ message: "User registered successfully", user });
    }

    res.status(200).json({ message: "User already exists", user });
  } catch (error) {
    res.status(500).json({ message: "Error registering or logging in user", error });
  }
};


exports.updateUserProfile = async (req, res) => {
  try {
    const walletAddress = req.body.walletAddress;
    const { username, email, description, website, socialLinks } = req.body;

    console.log("Received data:", {
      walletAddress,
      username,
      email,
      description,
      website,
      socialLinks,
    });

    
    if (!walletAddress) {
      return res.status(400).json({ message: "Wallet address is required" });
    }

    let profileImageUrl = req.body.profileImage; 
    if (req.file) {
   
      profileImageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }

  
    const updatedUser = await User.findOneAndUpdate(
      { walletAddress },
      {
        username,
        email,
        description,
        website,
        socialLinks,
        profileImage: profileImageUrl, 
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile", error });
  }
};


exports.getUserProfile = async (req, res) => {
  try {
    const { account } = req.params;
    const user = await User.findOne({ walletAddress: account.toLowerCase() }); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
    res.status(200).json({ message: "User profile fetched successfully", user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


exports.followUser = async (req, res) => {
  try {
    const { userId, followId } = req.body;

    const user = await User.findById(userId);
    const userToFollow = await User.findById(followId);

    if (!user || !userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

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
