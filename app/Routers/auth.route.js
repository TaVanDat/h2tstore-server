const express = require('express');
const router = express.Router();
const userController = require('../Controllers/auth.controller')

router.post('/register', userController.checkMail, userController.register)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
module.exports = router