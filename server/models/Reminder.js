const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    app: { type: mongoose.Schema.Types.ObjectId, ref: 'SocialMediaApp' },
    title: String,
    description: String,
    dueDate: Date,
    completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Reminder', reminderSchema);