const express = require('express');
var nodemailer = require('nodemailer')
require('dotenv').config()
const router = express.Router();
const getUser = require('../Controllers/user.controller')


const s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
router.get('/user-list', getUser.getUser)
router.get('/:id', getUser.userId)
router.put('/update', getUser.checkLogin, getUser.updateUser)
router.post('/send/recover', getUser.CheckEmail, function (req, res, next) {
    var transporter = nodemailer.createTransport({ // config mail server
        service: "gmail",
        auth: {
            user: process.env.ADMIN_MAIL,
            pass: process.env.ADMIN_PASSWORD
        }
    });
    req.user = Array.apply(null, Array(8)).map(function () { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'tavandat222@gmail.com',
        to: 'vandat.bk52@gmail.com',
        subject: 'Recover your password',
        text: 'You received message from ' + req.body.email,
        html: '<p>This is your new password: ' + req.user + '</p><span>Thank for reading!</span>'
    }
    transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
            res.status(404).json({ message: 'Not Found' })
        } else {
            // res.send({ message: "Send mail success!" })
            next();
        }
    });
}, getUser.recoverPassword);


//admin
router.put('/update-user', getUser.adminUpdateUser)
module.exports = router