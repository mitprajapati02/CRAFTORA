const express = require("express");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/", // Save images in 'uploads' directory
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

const {
  getUserProfile,
  updateUserProfile,
  changePassword,
  resetPassword,
  forgotPassword,
} = require("../controllers/userController");

const router = express.Router();

router.get("/profile", getUserProfile);

router.put("/profile", upload.single("profilePic"), updateUserProfile);

router.patch("/change-password", changePassword);

router.post("/forgot-password", forgotPassword);

router.patch("/reset-password", resetPassword);

module.exports = router;
