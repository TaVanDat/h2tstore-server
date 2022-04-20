const Category = require('../Models/category.model');
var category = new Category();



exports.checkCategoryId = function (req, res, next) {
    try {
        if (req.params.id) {
            if (!Number(req.params.id)) return res.status(404).json({ data: { message: "Not Found" }, error: true })
            category.checkCategory(req.params.id, function (err, data) {
                if (!err) { next(); }
                else { return res.status(400).json({ message: "Category isn't exist!" }); }
            })
        }
        else {
            return res.status(404).json({ data: { message: "Not Found" }, error: true });
        }
    } catch (error) {
        return res.sendStatus(500);
    }

}
//count quantity all category
exports.countAll = function (req, res, next) {
    try {
        category.count(function (err, data) {
            if (err) return res.sendStatus(500)
            else {
                req.countPage = data[0].Total;
                next();
            }
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}
// get all category
exports.getList = function (req, res) {
    try {
        let dataPage = req.query.page ? { page: req.query.page, page_size: req.query.page_size } : null
        category.getAll(dataPage, function (err, data) {
            if (err) return res.status(404).json({ data: { message: "Not Found" }, error: true })

            pagination = req.query.page ? {
                "page": req.query.page > 0 ? Number(req.query.page) : 1,
                "page_size": req.query.page_size > 0 ? Number(req.query.page_size) : 10,
                "totalRows": req.countPage
            } : { totalRows: req.countPage }
            return res.send({ data: { message: "SUCCESS", data, pagination }, error: false })
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}

// get follow id category
exports.getById = function (req, res) {
    try {
        if (!Number(req.params.id)) return res.status(400).json({ data: { message: "Bad Request" }, error: true })
        category.getDetail(req.params.id, function (err, data) {
            if (err) return res.status(404).json({ data: { message: "Not Found" }, error: true })

            return res.send({ data: { message: "SUCCESS", data }, error: false })

        })
    } catch (error) {
        return res.sendStatus(500);
    }
}

// add new 1 category
exports.addNew = function (req, res) {
    try {
        category.addNews(req.body, function (err, data) {
            if (!err)
                return res.send({ data: data, error: err })
            return res.status(400).json({ data: data, error: err })
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}
exports.update = function (req, res) {
    try {
        if (!Number(req.params.id)) return res.status(400).json({ data: { message: "Bad Request" }, error: true })
        category.update(req.params.id, req.body, function (err, data) {
            if (!err)
                return res.send({ data: data, error: err })
            return res.status(400).json({ data: data, error: err })
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}