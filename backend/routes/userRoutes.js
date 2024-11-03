const express = require("express");
const multer = require("multer"); // Import multer for file handling
const { registerOrLoginUser, updateUserProfile } = require("../controllers/userController");
const { handleFileUpload } = require("../controllers/uploadController");

const router = express.Router();

// Configure multer storage (optional, for customizing file handling)
const storage = multer.memoryStorage(); // Store files in memory as buffer
const upload = multer({ storage: storage }); // Define the upload middleware

router.post("/register", registerOrLoginUser);
router.put("/update-profile", updateUserProfile);
router.post("/upload-image", upload.single("file"), handleFileUpload); // Use upload middleware

module.exports = router;
