const express = require("express");
const {
  createSocialMediaApp,
  getAppsByUser,
  removeApp,
  getAppById,
  getTasksByUser,
  updateBio,
  updateProfile,
} = require("../controllers/socialMediaController");

const router = express.Router();

router.post("/socialApp", createSocialMediaApp);
router.get("/socialApps/", getAppsByUser);
router.delete("/socialApp/:appId", removeApp);
router.get("/socialApp/:appId", getAppById);
router.get("/tasks", getTasksByUser);
router.put("/socialApp/updateBio", updateBio);
router.patch("/socialApp/updateProfile", updateProfile);

module.exports = router;
