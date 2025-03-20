const express = require('express');
const { createReminder, getRemindersByApp} = require('../controllers/reminderController');

const router = express.Router();

router.get('/reminder/:appId', getRemindersByApp);

router.post('/reminder', createReminder);


module.exports = router;