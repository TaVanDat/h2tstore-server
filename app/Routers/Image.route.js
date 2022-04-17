const express = require('express');
const router = express.Router();
const productController = require('../Controllers/product.controller')

router.get('/list', productController.getList)
router.get('/:id', productController.getById)

router.post('/add', productController.addNew)
router.put('/update/:id', productController.update)
router.delete('/delete/:id', productController.deleteImg)
module.exports = router