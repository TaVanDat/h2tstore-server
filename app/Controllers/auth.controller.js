const User = require('../Models/auth.model');
const jwt = require('jsonwebtoken')
require('dotenv').config();
var users = new User();

exports.checkMail = function (req, res, next) {
    users.getEmail(req.body, function (err, data) {
        if (err) { next(); }
        else { res.send({ message: "Email is exist!" }); }
    })
}
exports.register = function (req, res) {
    users.regis(req.body, function (err, data) {
        res.send({ data: data, error: err })
    })
}
exports.login = function (req, res) {
    users.postUser(req.body, function (err, data) {
        // const email = data.find(user=>user.Email==req.body.Email)
        const user = { Id: data[0].Id, Email: data[0].Email, Code: data[0].Code }
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "1h" })
        res.send({ data: { message: 'LOGIN_SUCCESS', data, token: accessToken }, error: err })
    })
}