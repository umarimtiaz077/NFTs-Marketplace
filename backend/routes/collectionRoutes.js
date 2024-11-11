const express = require("express");
const { createCollection, getAllCollections,getUserCollections,getCollectionById } = require("../controllers/collectionController");
const multer = require("multer");

const router = express.Router();

// Configure multer for disk storage with unique filenames
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route to create a new collection
router.post("/create-collection", upload.single("file"), createCollection);

// Route to get all collections
router.get("/", getAllCollections);

router.get("/user/:userId", getUserCollections);
router.get("/:collectionId", getCollectionById);

module.exports = router;
