const Reminder = require('../models/Reminder');
const SocialMediaApp = require('../models/SocialMediaApp');


async function createReminder(req, res) {
    const { appId, title, description, dueDate } = req.body;
    try {
        const reminder = new Reminder({ app: appId, title, description, dueDate });
        await reminder.save();
        
        await SocialMediaApp.findByIdAndUpdate(appId, { $push: { reminders: reminder._id } });
        res.json(reminder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function markReminderCompleted(req, res) {
    try {
        const reminder = await Reminder.findByIdAndUpdate(req.params.id, { completed: true }, { new: true });
        res.json(reminder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function getRemindersByApp(req, res) {
    try {
        const reminders = await Reminder.find({ app: req.params.appId });
        res.json(reminders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { createReminder, markReminderCompleted, getRemindersByApp };
