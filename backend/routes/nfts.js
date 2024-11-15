<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const NFT = require('../models/NFT');

// Handle image upload as base64
router.post('/create', async (req, res) => {
  const { itemName, website, description, royalties, fileSize, category, properties, price, userAddress, image } = req.body;

  const newNFT = new NFT({
    itemName,
    website,
    description,
    royalties,
    fileSize,
    category,
    properties,
    price,
    userAddress,
    imageUrl: image, // Save the base64 image data
  });

  try {
    const savedNFT = await newNFT.save();
    res.status(201).json(savedNFT);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all NFTs
router.get('/', async (req, res) => {
  try {
    const nfts = await NFT.find();
    res.json(nfts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
=======
// routes/nftRoutes.js
const express = require('express');
const { createNFT, getAllNFTs } = require('../controllers/nftController');
const router = express.Router();

http://localhost:5000/api/nfts/creat

// Route for creating an NFT
router.post('/create', createNFT);

// Route for fetching all NFTs
router.get('/', getAllNFTs);



//new
// Like an NFT
router.post('/like/:id', async (req, res) => {
    const { userAddress } = req.body; // Get the wallet address from the request body
    const nftId = req.params.id;
  
    // Validate userAddress
    if (!userAddress) {
      return res.status(400).json({ message: "User address is required." });
    }
  
    try {
      const nft = await NFT.findById(nftId);
      if (!nft) {
        return res.status(404).json({ message: "NFT not found" });
      }
  
      // Check if the user already liked the NFT
      if (!nft.likes.includes(userAddress)) {
        nft.likes.push(userAddress); // Add userAddress to the likes array
        await nft.save();
        return res.status(200).json({ message: "NFT liked successfully", likes: nft.likes.length });
      } else {
        return res.status(400).json({ message: "You have already liked this NFT" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error liking NFT", error });
    }
  });
  
  // Unlike an NFT
  router.post('/unlike/:id', async (req, res) => {
    const { userAddress } = req.body; // Get the wallet address from the request body
    const nftId = req.params.id;
  
    // Validate userAddress
    if (!userAddress) {
      return res.status(400).json({ message: "User address is required." });
    }
  
    try {
      const nft = await NFT.findById(nftId);
      if (!nft) {
        return res.status(404).json({ message: "NFT not found" });
      }
  
      // Check if the user has liked the NFT
      if (nft.likes.includes(userAddress)) {
        nft.likes = nft.likes.filter(address => address !== userAddress); // Remove userAddress from the likes array
        await nft.save();
        return res.status(200).json({ message: "NFT unliked successfully", likes: nft.likes.length });
      } else {
        return res.status(400).json({ message: "You have not liked this NFT yet" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error unliking NFT", error });
    }
  });
  
>>>>>>> secondary/main

module.exports = router;
