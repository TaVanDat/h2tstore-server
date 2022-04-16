const User = require('../Models/auth.model');
const jwt = require('jsonwebtoken')
require('dotenv').config();
var users = new User();

exports.register = function (req, res) {
    users.regis(function (err, data) {
        res.send({ data: data, error: err })
    })
}
exports.login = function (req, res) {
    users.postUser(req.body, function (err, data) {
        // const email = data.find(user=>user.Email==req.body.Email)
        const accessToken = jwt.sign(req.body.Email, process.env.ACCESS_TOKEN)
        res.send({ data: { message: 'LOGIN_SUCCESS', data, token: accessToken }, error: err })
    })
}