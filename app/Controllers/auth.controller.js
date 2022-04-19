const User = require('../Models/auth.model');
const jwt = require('jsonwebtoken')
require('dotenv').config();
var users = new User();

exports.checkMail = function (req, res, next) {
    try {
        users.getEmail(req.body, function (err, data) {
            if (err) { next(); }
            else { return res.status(400).json({ message: "Email is exist!" }); }
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}
exports.register = function (req, res) {
    try {
        users.regis(req.body, function (err, data) {
            if (!err) return res.send({ data: data, error: err })
            return res.status(400).json({ data: data, error: err })
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}
exports.login = function (req, res) {
    try {
        users.signIn(req.body, function (err, data) {
            if (!data) return res.status(404).json({ data: { message: 'LOGIN FAILED', status: 404, } })
            const user = { Id: data[0].Id, Email: data[0].Email }
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "1h" })
            return res.send({ data: { message: 'LOGIN_SUCCESS', data, token: accessToken }, error: err })
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}