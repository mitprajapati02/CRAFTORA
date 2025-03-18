const bcrypt = require("bcryptjs");
const User = require("../models/User");

// 📌 User Signup Controller
const signupUser = async (req, res) => {
  const { username, mobile, email, profession, password } = req.body;
  

  try {
    // Check if email already 
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    // Check if mobile already exists
    user = await User.findOne({ mobile });
    if (user) return res.status(400).json({ message: "Mobile number already exists" });

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save User
    user = new User({ username, mobile, email, profession, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  try {
    // ✅ Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // ✅ Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Send user details (excluding password)
    res.json({
      message: "Login successful",
      user: { username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { signupUser, loginUser };
