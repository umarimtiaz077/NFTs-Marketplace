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

module.exports = router;
