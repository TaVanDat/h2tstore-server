const Cart = require('../Models/cart.model');
const jwt = require('jsonwebtoken')
require('dotenv').config();
var cart = new Cart();





// get all product
exports.getCart = function (req, res) {
    try {
        if (!req.data.Id) return res.status(400).json({ data: { message: "Bad Request" } })
        if (!Number(Number(req.data.Id))) return res.status(404).json({ data: { message: "Not Found" } })
        cart.getAll(req.data.Id, function (err, data) {
            if (err) return res.status(404).json({ data: { message: "Not Found" }, error: true })


            return res.send({ data: { message: "SUCCESS", data }, error: false })
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}


exports.checkCustomerId = function (req, res, next) {
    try {
        console.log(req.data.Id)
        cart.checkUser(req.data.Id, function (err, data) {
            req.cart = data[0];
            next();
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}

// add to cart
exports.addCart = function (req, res) {
    try {
        console.log(req.cart, req.body)
        cart.addNews(req.cart, req.body, function (err, data) {
            if (!err)
                return res.send({ data: data, error: err })
            return res.status(400).json({ data: data, error: err })
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}
// exports.update = function (req, res) {
//     try {
//         if (!Number(req.params.id)) return res.status(400).json({ data: { message: "Bad Request" }, error: true })
//         cart.update(req.params.id, req.body, function (err, data) {
//             if (!err)
//                 return res.send({ data: data, error: err })
//             return res.status(400).json({ data: data, error: err })
//         })
//     } catch (error) {
//         return res.sendStatus(500);
//     }
// }