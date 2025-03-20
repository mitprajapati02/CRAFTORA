const { default: mongoose } = require("mongoose");
const SocialMediaApp = require("../models/SocialMediaApp");
const User = require("../models/User");

// Utility function to decode token and get userId
const getUserIdFromToken = async (token) => {
  try {
    const user = await User.findOne({ token })
      .select("-password -token")
      .exec();
    if (user) {
      return user._id;
    }
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

async function createSocialMediaApp(req, res) {
  try {

    const token = req.headers.authorization.split(" ")[1];

    const userId = await getUserIdFromToken(token);

    const {
      mediaName,
      inMediaUsername,
      inMediaProfileImg = "",
      bio = "",
      states = {},
      values = {},
      tags = [],
      url = "",
    } = req.body;


    if (!mediaName || !inMediaUsername) {
      return res
        .status(400)
        .json({ error: "mediaName and inMediaUsername are required." });
    }


    const socialApp = new SocialMediaApp({
      user: userId,
      mediaName,
      inMediaUsername,
      inMediaProfileImg,
      bio,
      states,
      values,
      tags,
      url,
    });


    await socialApp.save();


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

async function getAppsByUser(req, res) {
  try {
    // Step 1: Get token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Step 2: Extract userId from the token
    const userId = await getUserIdFromToken(token);

    // Step 3: Fetch SocialMediaApp documents for the user
    const apps = await SocialMediaApp.find({ user: userId })
      .populate("reminders") // Populate reminders
      .populate("todoLists"); // Populate todoLists

    // Step 4: Format the response
    const formattedResponse = apps.map((app) => ({
      id: app._id, // Unique ID
      platform: app.mediaName, // Social media platform name
      icon: getPlatformIcon(app.mediaName), // Get icon based on platform name
      tasks: app.todoLists.map((todo) => todo.taskName), // Extract task names
    }));

    // Step 5: Send formatted response
    res.json(formattedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// Utility function to get icons based on platform name
function getPlatformIcon(platform) {
  const icons = {
    Facebook: "bi bi-facebook",
    Instagram: "bi bi-instagram",
    Twitter: "bi bi-twitter",
    LinkedIn: "bi bi-linkedin",
    YouTube: "bi bi-youtube",
  };
  return icons[platform] || "bi bi-globe"; // Default icon if not found
}

async function getAppById(req, res) {
  try {
    const { appId } = req.params;

    // Step 1: Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(appId)) {
      return res.status(400).json({ error: "Invalid app ID format" });
    }

    // Step 2: Find the SocialMediaApp by ID
    const app = await SocialMediaApp.findById(appId)
      .populate("reminders") // Populate reminders
      .populate("todoLists"); // Populate todoLists

    // Step 3: Check if the app exists
    if (!app) {
      return res.status(404).json({ error: "SocialMediaApp not found" });
    }

    // Step 4: Send the formatted response
    res.status(200).json({
      id: app._id,
      mediaName: app.mediaName,
      inMediaUsername: app.inMediaUsername,
      inMediaProfileImg: app.inMediaProfileImg || "",
      bio: app.bio || "",
      states: app.states || {},
      values: app.values || {},
      tags: app.tags || [],
      reminders: app.reminders || [],
      todoLists: app.todoLists || [],
      url: app.url || "",
      createdAt: app.createdAt,
    });
  } catch (error) {
    console.error("Error in getAppById:", error);
    res.status(500).json({ error: "Internal Server Error" });
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

async function updateBio(req, res) {
  try {
    const appId = req.headers.authorization.split(" ")[1];

    const { bio } = req.body;

    if (!bio) {
      return res.status(400).json({ error: "bio is required." });
    }

    const updatedAppBio = await SocialMediaApp.findByIdAndUpdate(
      appId,
      { bio },
      { new: true }
    );

    res.status(200).json(updatedAppBio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createSocialMediaApp,
  getAppsByUser,
  removeApp,
  getAppById,
  updateBio,
};
