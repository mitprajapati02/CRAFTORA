const express = require('express');
const { signupUser, loginUser } = require('../controllers/authController');



const router = express.Router();

// 📌 Use Controller in Route
router.post('/signup', signupUser);

router.post('/login', loginUser);


module.exports = router;
