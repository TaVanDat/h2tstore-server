const Product = require('../Models/product.model');
var product = new Product();

exports.checkProduct = function (req, res, next) {
    try {
        let checks = { Code: req.body.Code, id: req.params.id }
        if (checks.Code) {
            product.checkProduct(checks, function (err, data) {
                if (err) { next(); }
                else { return res.status(400).json({ message: 'Product is exist!' }); }
            })
        }
        else {
            if (!Number(checks.id)) return res.status(400).json({ data: { message: "Bad Request" }, error: true })
            product.checkProduct(checks, function (err, data) {
                if (!err) { next(); }
                else { return res.status(404).json({ message: "Product isn't exist!" }); }
            })
        }
    } catch (error) {
        return res.sendStatus(500);
    }

}
//count quantity all product
exports.countAll = function (req, res, next) {
    try {
        product.count(function (err, data) {
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
// get all product
exports.getList = function (req, res) {
    try {
        let dataPage = req.query.page ? { page: req.query.page, page_size: req.query.page_size } : null
        product.getAll(dataPage, function (err, data) {
            if (err) return res.status(404).json({ data: { message: "Not Found" }, error: true })
            data = data.map((item, index, data) => {
                return {
                    "Id": item.Id,
                    "Code": item.Code,
                    "Name": item.Name,
                    "Description": item.Description,
                    "Price": item.Price,
                    "StatusId": item.StatusId,
                    "UnitOfMeasureId": item.UnitOfMeasureId,
                    "SalePrice": item.SalePrice,
                    "Quantity": item.Quantity,
                    "Count": item.Count,
                    "CategoryId": item.CategoryId,
                    "BuyerStoreId": item.BuyerStoreId,
                    "CreatedAt": item.CreatedAt,
                    "UpdatedAt": item.UpdatedAt,
                    "Image": item.Image ? item.Image.split(',') : null,
                    "Size": item.Size ? item.Size.split(',') : null
                }
            })
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

// get follow id product
exports.getById = function (req, res) {
    try {
        if (!Number(req.params.id)) return res.status(400).json({ data: { message: "Bad Request" }, error: true })
        product.getDetail(req.params.id, function (err, data) {
            if (err) return res.status(404).json({ data: { message: "Not Found" }, error: true })
            data = {
                "Id": data[0].Id,
                "Code": data[0].Code,
                "Name": data[0].Name,
                "Description": data[0].Description,
                "Price": data[0].Price,
                "StatusId": data[0].StatusId,
                "UnitOfMeasureId": data[0].UnitOfMeasureId,
                "SalePrice": data[0].SalePrice,
                "Quantity": data[0].Quantity,
                "Count": data[0].Count,
                "CategoryId": data[0].CategoryId,
                "BuyerStoreId": data[0].BuyerStoreId,
                "CreatedAt": data[0].CreatedAt,
                "UpdatedAt": data[0].UpdatedAt,
                "Image": data[0].Image ? data[0].Image.split(',') : null,
                "Size": data[0].Size ? data[0].Size.split(',') : null
            }
            return res.send({ data: { message: "SUCCESS", data }, error: false })

        })
    } catch (error) {
        return res.sendStatus(500);
    }
}

// add new 1 product
exports.addNew = function (req, res) {
    try {
        product.addNews(req.body, function (err, data) {
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
        product.update(req.params.id, req.body, function (err, data) {
            if (!err)
                return res.send({ data: data, error: err })
            return res.status(400).json({ data: data, error: err })
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}

// delete 1 product
exports.deletePro = function (req, res) {
    try {
        if (!Number(req.params.id)) return res.status(400).json({ data: { message: "Bad Request" }, error: true })
        product.deleteId(req.params.id, function (err, data) {
            if (!err) return res.status(200).json({ data: data, error: err })
            return res.status(400).json({ data: data, error: err })
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}


//get product coat
exports.countAllCoat = function (req, res, next) {
    try {
        product.countCoat(function (err, data) {
            if (err) return res.sendStatus(500)
            else {
                req.countPage = data[0].TotalCoat;
                next();
            }
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}

exports.getListCoat = function (req, res) {
    try {
        let dataPage = req.query.page ? { page: req.query.page, page_size: req.query.page_size } : null
        product.getCoat(dataPage, function (err, data) {
            if (err) return res.status(404).json({ data: { message: "Not Found" }, error: true })
            data = data.map((item, index, data) => {
                return {
                    "Id": item.Id,
                    "Code": item.Code,
                    "Name": item.Name,
                    "Description": item.Description,
                    "Price": item.Price,
                    "StatusId": item.StatusId,
                    "UnitOfMeasureId": item.UnitOfMeasureId,
                    "SalePrice": item.SalePrice,
                    "Quantity": item.Quantity,
                    "Count": item.Count,
                    "CategoryId": item.CategoryId,
                    "BuyerStoreId": item.BuyerStoreId,
                    "CreatedAt": item.CreatedAt,
                    "UpdatedAt": item.UpdatedAt,
                    "Image": item.Image ? item.Image.split(',') : null,
                    "Size": item.Size ? item.Size.split(',') : null
                }
            })
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