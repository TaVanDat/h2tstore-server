const Dashboard = require('../Models/dashboard.model');
var dashboard = new Dashboard();
exports.countAllPro = function (req, res, next) {
    try {
        dashboard.countAllProduct(function (err, data) {
            if (err) return res.sendStatus(500)
            else {
                req.countPro = data[0].TotalProduct;
                next();
            }
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}
exports.countAllAccount = function (req, res, next) {
    try {
        dashboard.countAllAccount(function (err, data) {
            if (err) return res.sendStatus(500)
            else {
                req.countAcc = data[0].TotalAccount;
                next();
            }
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}
exports.countAllOrders = function (req, res, next) {
    try {
        dashboard.countAllOrder(function (err, data) {
            if (err) return res.sendStatus(500)
            else {
                req.countOrder = data[0].TotalOrder;
                next();
            }
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}
exports.countAllRevenue = function (req, res, next) {
    try {
        dashboard.countAllRevenues(function (err, data) {
            if (err) return res.sendStatus(500)
            else {
                req.countRevenues = data.reduce((sum, element) => sum + element.TotalRevenues, 0)
                next();
            }
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}
exports.dashboardAll = function (req, res) {
    try {
        let data = {
            TotalProduct: req.countPro,
            TotalAccount: req.countAcc,
            TotalOrder: req.countOrder,
            TotalRevenues: req.countRevenues
        }
        res.send({ data, message: 'Dashboard Success!' })
        // dashboard.countAllRevenues(function (err, data) {
        //     if (err) return res.sendStatus(500)
        //     else {
        //         req.countRevenues = data[0].TotalRevenues;
        //     }
        // })
    } catch (error) {
        return res.sendStatus(500);
    }
}