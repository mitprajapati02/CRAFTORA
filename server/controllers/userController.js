const User = require("../models/User");

const getUserProfile = async (req, res) => {
  try {
    let token = req.body.token;
    const user = await User.findById(token).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.profession = req.body.profession || user.profession;
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
