const express = require('express');
const router = express.Router();
const productController = require('../Controllers/product.controller')

//get product
//get all product
router.get('/list', productController.countAll, productController.getList)
//get product coat
router.get('/ao', productController.countAllCoat, productController.getListCoat)
//get product coat T-Shirt
// router.get('/ao-thun', productController.countAllCoatTShirt, productController.getListCoatTShirt)

//get latest product
router.get('/latest', productController.getLatest)
// get sale product
router.get('/sale75', productController.getSaleProduct75)

// get relative product 
router.get('/relative', productController.getRelativeProduct);


//get product follow CategoryId send from client
router.get('/category/:id', productController.countAllCategoryId, productController.getProductCategoryId)




router.get('/:id', productController.getById)
router.post('/add', productController.checkProduct, productController.addNew)
router.put('/update/:id', productController.update)
router.delete('/delete/:id', productController.checkProduct, productController.deletePro)

module.exports = router