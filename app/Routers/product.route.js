const express = require('express');
const router = express.Router();
const productController = require('../Controllers/product.controller')
try {


    router.get('/list', productController.getList)
    router.get('/:id', productController.getById)

    router.post('/add', productController.checkProduct, productController.addNew)
    router.put('/update/:id', productController.update)
    router.delete('/delete/:id', productController.checkProduct, productController.deletePro)
} catch (error) {
    console.log(error)
}
module.exports = router