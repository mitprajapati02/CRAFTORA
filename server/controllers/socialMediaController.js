const SocialMediaApp = require("../models/SocialMediaApp");
const User = require("../models/User");

async function createSocialMediaApp(req, res) {
  try {
    // Step 1: Get token from the Authorization header
    const token = req.header("Authorization").replace("Bearer ", "");

    // Step 2: Decode the token to get the userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
    const userId = decoded.userId;

    // Step 3: Extract details from the request body
    const {
      mediaName,
      inMediaUsername,
      inMediaProfileImg = "",
      bio = "",
      states = {},
      values = {},
      tags = [],
    } = req.body;

    // Step 4: Create a new SocialMediaApp document
    const socialApp = new SocialMediaApp({
      user: userId,
      mediaName,
      inMediaUsername,
      inMediaProfileImg,
      bio,
      states,
      values,
      tags,
    });

    // Step 5: Save the SocialMediaApp to the database
    await socialApp.save();

    // Step 6: Add the new social app's ID to the user's socialMediaApps array
    await User.findByIdAndUpdate(userId, {
      $push: { socialMediaApps: socialApp._id },
    });

    // Step 7: Respond with the newly created social media app
    res.status(201).json(socialApp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// Utility function to decode token and get userId
const getUserIdFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

async function getAppsByUser(req, res) {
  try {
    // Step 1: Get token from Authorization header
    const token = req.header("Authorization").replace("Bearer ", "");

    // Step 2: Extract userId from token
    const userId = getUserIdFromToken(token);

    // Step 3: Fetch SocialMediaApp documents for the user
    const apps = await SocialMediaApp.find({ user: userId })
      .populate("reminders") // Populate reminders
      .populate("todoLists"); // Populate todoLists

    // Step 4: Respond with the social media apps
    res.json(apps);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function getAppById(req, res) {
  try {
    // Step 1: Find the SocialMediaApp by ID
    const app = await SocialMediaApp.findById(req.params.appId)
      .populate("reminders") // Populate reminders if needed
      .populate("todoLists"); // Populate todoLists if needed

    // Step 2: Check if the app exists
    if (!app) {
      return res.status(404).json({ error: "SocialMediaApp not found" });
    }

    // Step 3: Respond with the app data
    res.json(app);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function removeApp(req, res) {
  try {
    // Step 1: Find and delete the SocialMediaApp
    const app = await SocialMediaApp.findById(req.params.appId);

    if (!app) {
      return res.status(404).json({ error: "SocialMediaApp not found" });
    }

    // Step 2: Remove the app from the user's socialMediaApps array and delete the app
    const userUpdate = User.findByIdAndUpdate(
      app.user,
      { $pull: { socialMediaApps: app._id } },
      { new: true } // This ensures we get the updated user (not required here but can be helpful for tracking)
    );

    const appDelete = app.delete(); // Delete the social media app

    // Step 3: Run both operations concurrently
    await Promise.all([userUpdate, appDelete]);

    // Step 4: Respond with a success message
    res.json({ message: "App deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createSocialMediaApp, getAppsByUser, removeApp };
