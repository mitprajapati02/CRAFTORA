const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  changePassword,
  resetPassword,
  forgotPassword,
} = require("../controllers/userController");

const router = express.Router();

router.get("/profile", getUserProfile);

router.put("/profile", updateUserProfile);

router.patch("/change-password", changePassword);

router.post("/forgot-password", forgotPassword);

router.patch("/reset-password", resetPassword);

module.exports = router;
