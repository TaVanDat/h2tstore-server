const Bill = require('../Models/bill.model')
var bill = new Bill()

exports.getList = function (req, res) {
    try {
        bill.getOrder(function (err, data) {
            if (err) return res.status(404).json({ data: { message: "Not Found" }, error: true })
            return res.send({ data: { message: "SUCCESS", data }, error: false })

        })
    } catch (error) {
        return res.sendStatus(500);
    }
}

exports.changeStatus = function (req, res, next) {
    try {
        bill.updateStatus({ Id: req.body.Id, StatusId: req.body.StatusId }, function (err, data) {
            if (err) return res.status(404).json({ data: { message: "Not Found" }, error: true })
            next();
            // return res.send({ data: { message: "SUCCESS", data }, error: false })

        })
    } catch (error) {
        return res.sendStatus(500);
    }
}