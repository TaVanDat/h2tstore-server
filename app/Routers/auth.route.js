// const express = require('express');
// const router = express.Router();
// const auth = require('../Controllers/auth.controller');

// router.post('/login', auth.UserLogin);
// router.get('/user', auth.getUser);
// module.exports = router
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/auth.controller')

router.post('/register', userController.checkMail, userController.register)
router.post('/login', userController.login)
module.exports = router