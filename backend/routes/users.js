const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error('Error creating user:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// Retrieve user by wallet address
router.get('/:wallet', async (req, res) => {
  try {
    const user = await User.findOne({ walletAddress: req.params.wallet });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error retrieving user:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Update user by wallet address
router.put('/:wallet', async (req, res) => {
  try {
    console.log(`Updating user with wallet address: ${req.params.wallet}`);
    console.log('Request body:', req.body);

    const updatedUser = await User.findOneAndUpdate(
      { walletAddress: req.params.wallet },
      req.body,
      { new: true } // Return the updated document
    );
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error updating user:', err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
