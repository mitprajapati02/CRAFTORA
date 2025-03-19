const mongoose = require('mongoose');

const todoListSchema = new mongoose.Schema({
    app: { type: mongoose.Schema.Types.ObjectId, ref: 'SocialMediaApp' },
    title: String,
    tasks: [{
        task: String,
        completed: { type: Boolean, default: false }
    }]
});

module.exports = mongoose.model('TodoList', todoListSchema);
