const express = require('express');
const { createReminder, markReminderCompleted, getRemindersByApp} = require('../controllers/reminderController');

const router = express.Router();

router.get('/reminder/:appId', getRemindersByApp);

router.post('/reminder', createReminder);

router.put('/reminder/:id/complete', markReminderCompleted);

module.exports = router;