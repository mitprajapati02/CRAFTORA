const mongoose = require('mongoose');


const socialMediaAppSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mediaName: { type: String, required: true },
  inMediaUsername: { 
    type: String, 
    unique: true, 
    required: true, 
    minlength: 3, 
    maxlength: 30 
  },
  inMediaProfileImg: { type: String, default: "" },
  bio: { type: String, maxlength: 500 },
  states: {
    state1: { type: String },
    state2: { type: String },
    state3: { type: String }
  },
  values: {
    value1: { type: String },
    value2: { type: String },
    value3: { type: String }
  },


  tags: [{ type: String, default: [] }],


  reminders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reminder" }],
  todoLists: [{ type: mongoose.Schema.Types.ObjectId, ref: "TodoList" }],
}, {
  timestamps: true
});

module.exports = mongoose.model("SocialMediaApp", socialMediaAppSchema);