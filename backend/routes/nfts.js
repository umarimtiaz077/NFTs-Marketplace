// routes/nftRoutes.js
const express = require('express');
const { createNFT, getAllNFTs } = require('../controllers/nftController');
const router = express.Router();

http://localhost:5000/api/nfts/creat

// Route for creating an NFT
router.post('/create', createNFT);

// Route for fetching all NFTs
router.get('/', getAllNFTs);

module.exports = router;
