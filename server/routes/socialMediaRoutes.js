const express = require('express');
const { createSocialMediaApp, getAppsByUser, removeApp } = require('../controllers/socialMediaController');


const router = express.Router();


router.post('/socialApp', createSocialMediaApp);
router.get('/socialApps/:userId', getAppsByUser);
router.delete('/socialApp/:appId', removeApp);

module.exports = router;