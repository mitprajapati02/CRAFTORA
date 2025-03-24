const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const socialMediaRoutes = require("./routes/socialMediaRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const todoListRoutes = require("./routes/todoListRoutes");

const app = express();

app.use(cors({ origin: "*" })); // Allow frontend
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/social", socialMediaRoutes);

app.use("/api/reminder", reminderRoutes);

app.use("/api/todo", todoListRoutes);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});
