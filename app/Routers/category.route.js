const express = require('express')
const router = express.Router();
const categoryController = require('../Controllers/category.controller');

router.get('/all', categoryController.countAll, categoryController.getList)
router.get('/:id', categoryController.getById)
router.post('/add-new', categoryController.addNew)
router.put('/update/:id', categoryController.checkCategoryId, categoryController.update)
module.exports = router