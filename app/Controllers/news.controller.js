const News = require('../Models/news.model');
var news = new News();

exports.getList = function (req, res) {
    try {
        news.getAll(function (err, data) {
            if (err) return res.status(404).json({ data: { message: "Not Found" }, error: true })
            return res.send({ data: { message: "SUCCESS", data }, error: false })

        })
    } catch (error) {
        return res.sendStatus(500);
    }
}
exports.getLatestNew = function (req, res) {
    try {
        news.getLatest(function (err, data) {
            if (err) return res.status(404).json({ data: { message: "Not Found" }, error: true })
            return res.send({ data: { message: "SUCCESS", data }, error: false })

        })
    } catch (error) {
        return res.sendStatus(500);
    }
}

exports.getById = function (req, res) {
    try {
        if (!Number(req.params.id)) return res.status(400).json({ data: { message: "Bad Request" }, error: true })
        news.getDetail(req.params.id, function (err, data) {
            if (err) return res.status(404).json({ data: { message: "Not Found" }, error: true })
            return res.send({ data: { message: "SUCCESS", data }, error: false })

        })
    } catch (error) {
        return res.sendStatus(500);
    }
}