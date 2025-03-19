const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  app: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SocialMediaApp",
    required: true,
  },
  reminder: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Reminder", reminderSchema);
