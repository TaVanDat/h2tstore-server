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
        const token = req.headers?.authorization?.split(' ')[1]
        if (!token) { res.sendStatus(401); return }
        jwt.verify(token, process.env.ACCESS_TOKEN, (errors, response) => {
            if (errors) res.sendStatus(403)
            next();
        })
    } catch (error) {
        res.sendStatus(403)
    }
}
exports.getUser = function (req, res) {
    try {
        user.getAll(function (err, data) {
            res.send({ data: data, error: err })
        })
    } catch (error) {
        res.sendStatus(500)
    }

}
exports.userId = function (req, res) {
    try {
        user.getUserById(req.params.id, function (err, data) {
            res.send({ data: { message: 'SUCCESS', data }, error: err })
            // const email = data.find(user=>user.Email==req.body.Email)
            // const accessToken = jwt.sign(req.body.Email, process.env.ACCESS_TOKEN)
            // res.send({ data: { message: 'LOGIN_SUCCESS', data, token: accessToken }, error: err })
        })
    } catch (error) {
        res.sendStatus(500)
    }

}