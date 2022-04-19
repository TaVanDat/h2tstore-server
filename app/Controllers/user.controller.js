const getUsers = require('../Models/user.model');
const jwt = require('jsonwebtoken')
require('dotenv').config();
var user = new getUsers();

exports.checkLogin = function (req, res, next) {
    try {
        const token = req.headers?.authorization?.split(' ')[1]
        if (!token) { return res.status(401).json({ message: 'Unauthorized', statusCode: 401 }); }
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
            if (err) res.status(403).json({ message: 'Forbidden', statusCode: 403 })
            else {
                // console.log(data.Id);
                req.data = data
                next();
            }
        })
    } catch (error) {
        return res.status(403).send({ err: [{ error }] })
    }
}
exports.getUser = function (req, res) {
    try {
        user.getAll(function (err, data) {
            if (!err) return res.send({ data: { message: "SUCCESS", data }, error: false })
            return res.status(404).json({ data: { message: "Not Found" }, error: true })
        })
    } catch (error) {
        return res.sendStatus(500)
    }

}
exports.userId = function (req, res) {
    try {
        if (!Number(req.params.id)) return res.status(400).json({ data: { message: "Bad Request" }, error: true })
        user.getUserById(req.params.id, function (err, data) {
            if (!err) return res.send({ data: { message: "SUCCESS", data }, error: false })
            return res.status(404).json({ data: { message: "Not Found" }, error: true })
        })
    } catch (error) {
        return res.sendStatus(500)
    }
}
exports.updateUser = function (req, res) {
    try {
        user.update(req.data.Id, req.body, function (err, response) {
            if (err) return res.status(404).json({ data: { message: "Not Found" }, error: true })
            // let newDataUpdate = Object.assign(req.data,response)
            return res.send({ data: { message: "SUCCESS", data: Object.assign(req.data, response) }, error: false })
        })
    } catch (err) {
        return res.sendStatus(500)
    }
}