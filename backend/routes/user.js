// plugin npm Node.js
const express = require('express');
const router = express.Router();
// configuration de la route user
// besoin du controler pour associer les fonctions aux différentes routes 
const userController = require('../controllers/user');

const checkDataSignup = require('../middlewares/checkSignup');

// Les Routes
router.post('/signup', checkDataSignup, userController.signup);
router.post('/login', userController.login);

module.exports = router;