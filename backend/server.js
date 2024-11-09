<<<<<<< HEAD
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Increase the payload size limit for JSON and URL-encoded data
app.use(express.json({ limit: '50mb' })); // Adjust the size as needed
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Adjust the size as needed

// Connect to MongoDB
=======
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoutes");
const nftRoutes = require("./routes/nfts");
const collectionRoutes = require('./routes/collectionRoutes');
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/uploads", express.static("uploads"));

console.log("chk ,....", process.env.MONGO_URI);

>>>>>>> secondary/main
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
<<<<<<< HEAD
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const userRoutes = require('./routes/users');
const nftRoutes = require('./routes/nfts');
app.use('/api/users', userRoutes);
app.use('/api/nfts', nftRoutes);

=======
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));



app.use("/api/users", userRoutes);
app.use("/api/nfts", nftRoutes);
app.use('/api/collection', collectionRoutes);
>>>>>>> secondary/main
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
