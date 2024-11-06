const express = require("express");
const { createCollection, getAllCollections } = require("../controllers/collectionController");
const multer = require("multer");

const router = express.Router();

// Configure multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to create a new collection
router.post("/create-collection", upload.single("file"), createCollection);

// Route to get all collections
router.get("/", getAllCollections);

module.exports = router;
