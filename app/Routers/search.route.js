const express = require('express');
const router = express.Router();
const searchController = require('../Controllers/search.controller')

router.get('/all', searchController.getProSearch)
module.exports = router;