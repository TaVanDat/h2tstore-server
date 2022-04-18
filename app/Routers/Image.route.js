const express = require('express');
const router = express.Router();
const imageController = require('../Controllers/Image.controller')

// router.get('/list', productController.getList)
// router.get('/:id', productController.getById)

router.post('/add-image', imageController.addNew)
router.put('/update/:id', imageController.update)
router.delete('/delete/:id', imageController.deleteImg)
router.get('/get/:id', imageController.getImages)

module.exports = router