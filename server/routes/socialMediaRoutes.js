const express = require('express');
const { createSocialMediaApp, getAppsByUser, removeApp, getAppById, updateBio } = require('../controllers/socialMediaController');


const router = express.Router();


router.post('/socialApp', createSocialMediaApp);
router.get('/socialApps/', getAppsByUser);
router.delete('/socialApp/:appId', removeApp);
router.get('/socialApp/:appId', getAppById);
router.put('/socialApp/updateBio', updateBio);

module.exports = router;
