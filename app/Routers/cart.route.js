const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer')
require('dotenv').config()
const cartController = require('../Controllers/cart.controller')
const getUser = require('../Controllers/user.controller')


router.get('/get-cart', getUser.checkLogin, cartController.getCart)
// router.post('/add-cart', getUser.checkLogin, cartController.checkCustomerId, cartController.addCart)
router.post('/add', getUser.checkLogin, cartController.getCartMiddleWare, cartController.addToCart, cartController.getCart)

//delete
router.delete('/delete', getUser.checkLogin, cartController.deleteCartPro)


router.post('/payment', getUser.checkLogin, cartController.UpdateOrderTable, cartController.UpdateOrderContentTable, cartController.paymentCart,
    cartController.getProductOrders, cartController.getProductsQuantity, cartController.updateQuantityProduct,
    function (req, res) {
        var transporter = nodemailer.createTransport({ // config mail server
            service: "gmail",
            auth: {
                user: process.env.ADMIN_MAIL,
                pass: process.env.ADMIN_PASSWORD
            }
        });
        // req.user = Array.apply(null, Array(8)).map(function () { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'tavandat222@gmail.com',
            to: 'vandat.bk52@gmail.com',
            subject: 'Đặt hàng thành công',
            text: 'You received message from ',
            html: '<p>Quý khách đã đặt hàng thành công</p><p>Đơn hàng của quý khách đang chờ xét duyệt</p>'
        }
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                res.status(404).json({ message: 'Not Found' })
            } else {
                // res.send({ message: "Send mail success!" })
                // next();
                return res.send({ data: { message: 'Payment Success' } })
            }
        });
    })
module.exports = router