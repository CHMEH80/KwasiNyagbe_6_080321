// plugin npm Node.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

const checkDataSignup = require('../middlewares/checkSignup');

// Les Routes
router.post('/signup', checkDataSignup, userController.signup);
router.post('/login', userController.login);

module.exports = router;