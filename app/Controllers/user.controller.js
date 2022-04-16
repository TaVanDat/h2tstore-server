const getUsers = require('../Models/user.model');
const jwt = require('jsonwebtoken')
require('dotenv').config();
var user = new getUsers();

// exports.checkMail = function (req, res, next) {
//     user.getEmail(req.body, function (err, data) {
//         if (err) { next(); }
//         else { res.send({ message: "Email is exist!" }); }
//     })
// }
exports.checkLogin = function (req, res, next) {
    try {
        const token = req.headers?.authentication?.split(' ')[1];
        if (!token) res.sendStatus(401);
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
            if (!err) next()
            else res.send({ message: "not authentication" })
        })
    } catch (error) {
        res.send({ message: 'Token không hợp lệ!', status: 500 })
    }
}
exports.getUser = function (req, res) {
    user.getAll(function (err, data) {
        res.send({ data: data, error: err })
    })
}
exports.userId = function (req, res) {
    user.getUserById(req.params.id, function (err, data) {
        res.send({ data: { message: 'SUCCESS', data }, error: err })
        // const email = data.find(user=>user.Email==req.body.Email)
        // const accessToken = jwt.sign(req.body.Email, process.env.ACCESS_TOKEN)
        // res.send({ data: { message: 'LOGIN_SUCCESS', data, token: accessToken }, error: err })
    })
}