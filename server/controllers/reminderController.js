const Reminder = require("../models/Reminder");
const SocialMediaApp = require("../models/SocialMediaApp");

async function createReminder(req, res) {
  const { appId, reminder, date } = req.body;
  try {
    // Create new reminder with provided data
    const newReminder = new Reminder({
      app: appId,
      reminder, // 'reminder' text
      date, // Due date
    });

    // Save the reminder to the database
    await newReminder.save();

    // Add the new reminder's ID to the SocialMediaApp's 'reminders' array
    await SocialMediaApp.findByIdAndUpdate(appId, {
      $push: { reminders: newReminder._id },
    });

    // Respond with the created reminder
    res.json(newReminder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getRemindersByApp(req, res) {
  try {
    // Fetch all reminders for the given appId
    const reminders = await Reminder.find({ app: req.params.appId });

    // If no reminders are found, return an empty array
    if (reminders.length === 0) {
      return res.json([]);
    }

    // Respond with the list of reminders
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createReminder, getRemindersByApp };
