// eslint-disable-next-line no-undef
const User = require("../models/User");

const getUserProfile = async (req, res) => {
  try {
    // Step 1: Get token from request headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Step 2: Find the user and populate social media apps
    const user = await User.findOne({ token })
      .select("-password -token") // Exclude password & token
      .populate("socialMediaApps", "mediaName _id inMediaProfileImg") // Populate apps
      .exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 3: Format social media apps with icons
    const formattedApps = user.socialMediaApps.map((app) => ({
      id: app._id,
      platform: app.mediaName,
      icon: getPlatformIcon(app.mediaName),
      profileImg: app.inMediaProfileImg || "", // Get profile image if available
    }));

    // Step 4: Send user data along with their social media apps
    res.json({
      user,
      apps: formattedApps,
    });
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

function getPlatformIcon(platform) {
  const icons = {
    Facebook: "bi bi-facebook",
    Instagram: "bi bi-instagram",
    Twitter: "bi bi-twitter",
    LinkedIn: "bi bi-linkedin",
    YouTube: "bi bi-youtube",
  };
  return icons[platform] || "bi bi-globe";
}

const updateUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findOne({ token })
      .select("-password -token")
      .exec();
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.profession = req.body.profession || user.profession;
      user.age = req.body.age || user.age;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      res.json({
        message: "User updated successfully",
        user: {
          username: updatedUser.username,
          email: updatedUser.email,
          profession: updatedUser.profession,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findOne({ token })
      .select("-password -token")
      .exec();
    if (user) {
      user.password = req.body.password;
      const updatedUser = await user.save();
      res.json({
        message: "Password updated successfully",
        user: {
          username: updatedUser.username,
          email: updatedUser.email,
          profession: updatedUser.profession,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (user) {
      user.password = password;
      await user.save();
      res.json({ message: "Password updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// eslint-disable-next-line no-undef
module.exports = {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  changePassword,
};
