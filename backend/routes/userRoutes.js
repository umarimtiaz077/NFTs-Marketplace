// userRoutes.js
const express = require("express");
const multer = require("multer");
const {
  registerOrLoginUser,
  updateUserProfile,
  getUserProfile,
  getUserProfileById,
  getAllUsers,
  followUser,
  getFollowers,
  getFollowing,
  getFollowCount,
  getLikedNFTs,
  getOwnedNFTs,
  getCreatedNFTs,
  unfollowUser,
} = require("../controllers/userController");

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

router.post("/register", registerOrLoginUser);
router.put("/update-profile", upload.single("file"), updateUserProfile);
router.get("/:account", getUserProfile);
router.get("/profile/:userId", getUserProfileById);

router.get("/", getAllUsers);
router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);
router.get("/:userId/followers", getFollowers);
router.get("/:userId/following", getFollowing);
router.get("/:userId/follow-count", getFollowCount);
router.get("/:userId/liked-nfts", getLikedNFTs);
router.get("/:userId/owned-nfts", getOwnedNFTs);
router.get("/:userId/created-nfts", getCreatedNFTs);

module.exports = router;
