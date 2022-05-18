const express = require('express')
var nodemailer = require('nodemailer')
require('dotenv').config()
const router = express.Router();

const billController = require('../Controllers/bill.controller')

// get all order
router.get('/all', billController.getList);
router.get('/:id', billController.getDetails);
router.put('/update-bill', billController.changeStatus, function (req, res) {
    var transporter = nodemailer.createTransport({ // config mail server
        service: "gmail",
        auth: {
            user: process.env.ADMIN_MAIL,
            pass: process.env.ADMIN_PASSWORD
        }
    });
    const statusId = Number(req.body.StatusId) === 3 ? 'Đang chờ xét duyệt' : (Number(req.body.StatusId) === 4 ? 'Đã duyệt' : 'Đã hủy')
    var mainOptions = Number(req.body.StatusId) === 3 ?
        {
            from: 'tavandat222@gmail.com',
            to: 'vandat.bk52@gmail.com',
            subject: 'Đang chờ xét duyệt',
            text: 'Bạn đã nhận được mail từ: tavandat222@gmail.com',
            html: '<p>Đơn hàng của quý khách đang chờ kiểm duyệt, vui lòng chờ!</p><p>Cảm ơn quý khách đã đặt hàng!</p><span></span>'
        } :
        (Number(req.body.StatusId) === 4 ?
            {
                from: 'tavandat222@gmail.com',
                to: 'vandat.bk52@gmail.com',
                subject: 'Đã duyệt',
                text: 'Bạn đã nhận được mail từ: tavandat222@gmail.com',
                html: '<p>Đơn hàng của quý khách đã được duyệt thành công!</p><p>Cảm ơn quý khách đã đặt hàng!</p><span></span>'
            } :
            {
                from: 'tavandat222@gmail.com',
                to: 'vandat.bk52@gmail.com',
                subject: 'Hủy đơn hàng',
                text: 'Bạn đã nhận được mail từ: tavandat222@gmail.com',
                html: '<p>Đơn hàng của quý khách đã bị hủy vì không đặt yêu cầu! Quý khách vui lòng đặt hàng lại!</p><span></span>'
            })
    transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
            res.status(404).json({ message: 'Not Found' })
        } else {
            res.send({ message: "Send mail success!" })
        }
    });
});

module.exports = router