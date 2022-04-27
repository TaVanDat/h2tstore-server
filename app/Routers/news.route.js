const express = require('express');
const router = express.Router();
const newsController = require('../Controllers/news.controller')

router.get('/list', newsController.getList)
router.get('/latest', newsController.getLatestNew)



router.get('/:id', newsController.getById)

module.exports = router;