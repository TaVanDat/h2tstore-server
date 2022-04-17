const getUsers = require('../Models/user.model');
const jwt = require('jsonwebtoken')
require('dotenv').config();
var user = new getUsers();

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
        })
    } catch (error) {
        res.sendStatus(500)
    }
}
exports.updateUser = function (req, res) {
    try {
        user.update(req.data, req.body, function (err, data) {
            res.send({ data: { message: 'SUCCESS', data }, error: err })
        })
    } catch (err) {
        res.sendStatus(500)
    }
}