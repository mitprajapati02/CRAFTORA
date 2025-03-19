const mongoose = require('mongoose');

const socialMediaAppSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String, // Example: Facebook, Twitter, etc.
    reminders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reminder' }],
    todoLists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TodoList' }]
});

module.exports = mongoose.model('SocialMediaApp', socialMediaAppSchema);