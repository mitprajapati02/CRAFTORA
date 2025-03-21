// eslint-disable-next-line no-undef
const User = require('../models/User');

const getUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const user = await User.findOne({ token })
      .select('-password -token')
      .exec();
    if (user) {
      res.json({ user });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const user = await User.findOne({ token })
      .select('-password -token')
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
        message: 'User updated successfully',
        user: {
          username: updatedUser.username,
          email: updatedUser.email,
          profession: updatedUser.profession,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const user = await User.findOne({ token })
      .select('-password -token')
      .exec();
    if (user) {
      user.password = req.body.password;
      const updatedUser = await user.save();
      res.json({
        message: 'Password updated successfully',
        user: {
          username: updatedUser.username,
          email: updatedUser.email,
          profession: updatedUser.profession,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (user) {
      user.password = password;
      await user.save();
      res.json({ message: 'Password updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// eslint-disable-next-line no-undef
module.exports = {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  changePassword,
};
