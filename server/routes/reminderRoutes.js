const express = require('express');
const { createReminder, getRemindersByApp} = require('../controllers/reminderController');

const router = express.Router();

router.get('/reminder/:appId', getRemindersByApp);

router.post('/add', createReminder);


module.exports = router;
