// controllers/collectionController.js
const Collection = require("../models/Collection");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.createCollection = async (req, res) => {
  try {
    const { name, description, userId } = req.body;
    const file = req.file; // Access the uploaded file

    console.log("Received name:", name);
    console.log("Received description:", description);
    console.log("Received userId:", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const image = file ? `/uploads/${file.originalname}` : null; // Path for saving the file

    const newCollection = new Collection({
      name,
      description,
      image,  // Store the image path
      user: user._id,
    });

    await newCollection.save();

    res.status(201).json({
      message: "Collection created successfully",
      collection: newCollection,
    });
  } catch (error) {
    console.error("Error creating collection:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


// Get all collections
exports.getAllCollections = async (req, res) => {
  try {
    // Retrieve all collections and populate the user field
    const collections = await Collection.find().populate("user", "username walletAddress");

    res.status(200).json({ collections });
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
