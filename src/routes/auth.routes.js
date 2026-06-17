// APIs declared here, defined in controllers folder
const express = require('express');
const authController = require('../controllers/auth.controller')

const router = express.Router();

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.post('/logout', authController.logoutUser)
// For frontend to know if any user logged in, and then retrieve his/her data. If not done, on every page refresh frontend
// looses track of any user logged in or not
router.get('/me', authController.getCurrentUser)

module.exports = router;