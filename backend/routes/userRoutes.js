const express = require("express");
const multer = require("multer");
const { registerOrLoginUser, updateUserProfile, getUserProfile } = require("../controllers/userController");

const router = express.Router();


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

// Define routes
router.post("/register", registerOrLoginUser);
router.put("/update-profile", upload.single("file"), updateUserProfile);
router.get("/:account", getUserProfile);

module.exports = router;
