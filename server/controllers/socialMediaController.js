const SocialMediaApp = require('../models/SocialMediaApp');
const User = require('../models/User');


async function createSocialMediaApp(req, res) {
    const { userId, name } = req.body;
    try {
        const socialApp = new SocialMediaApp({ user: userId, name });
        await socialApp.save();
        
        await User.findByIdAndUpdate(userId, { $push: { socialMediaApps: socialApp._id } });
        res.json(socialApp);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function getAppsByUser(req, res) {
    try {
        const apps = await SocialMediaApp.find({ user: req.params.userId }).populate('reminders todoLists');
        res.json(apps);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function removeApp(req, res) {
    try {
        const app = await SocialMediaApp.findByIdAndDelete(req.params.appId);
        if (app) {
            await User.findByIdAndUpdate(app.user, { $pull: { socialMediaApps: app._id } });
            res.json({ message: 'App deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createSocialMediaApp, getAppsByUser, removeApp };
