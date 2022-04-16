const express = require('express');
const router = express.Router();
const getUser = require('../Controllers/user.controller')

router.get('/user-list', getUser.getUser)
router.get('/:id', getUser.userId)
module.exports = router