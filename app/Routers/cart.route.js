const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cart.controller')
const getUser = require('../Controllers/user.controller')


router.get('/get-cart', getUser.checkLogin, cartController.getCart)
// router.post('/add-cart', getUser.checkLogin, cartController.checkCustomerId, cartController.addCart)
router.post('/add', getUser.checkLogin, cartController.getCartMiddleWare, cartController.addToCart, cartController.getCart)

//delete
router.delete('/delete', getUser.checkLogin, cartController.deleteCartPro)
module.exports = router