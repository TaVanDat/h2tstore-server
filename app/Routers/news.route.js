const express = require('express');
const router = express.Router();
const newsController = require('../Controllers/news.controller')

router.get('/list', newsController.getList)
router.get('/latest', newsController.getLatestNew)
router.post('/add', newsController.newsAdd)
router.put('/update/:id', newsController.updateNews)


router.delete('/delete/:id', newsController.deleteNews)
router.get('/:id', newsController.getById)

module.exports = router;