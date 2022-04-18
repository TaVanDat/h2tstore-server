const Product = require('../Models/product.model');
var product = new Product();

exports.checkProduct = function (req, res, next) {
    users.getEmail(req.body, function (err, data) {
        if (err) { next(); }
        else { res.send({ data }); }
    })
}
exports.getList = function (req, res) {
    product.getAll(function (err, data) {
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
        res.send({ data: { message: "SUCCESS", data }, error: err })
    })
}
exports.getById = function (req, res) {
    product.getDetail(req.params.id, function (err, data) {
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
        res.send({ data: { message: "SUCCESS", data }, error: err })
    })
}
exports.addNew = function (req, res) {
    product.addNews(req.body, function (err, data) {
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
                "Image": item.Image.split(','),
                "Size": item.Size
            }
        })
        res.send({ data: { message: "SUCCESS", data }, error: err })
    })
}
exports.update = function (req, res) {
    product.update(req.params.id, req.body, function (err, data) {
        res.send({ data: data, error: err })
    })
}
exports.deleteImg = function (req, res) {
    product.deleteId(req.params.id, function (err, data) {
        res.send({ data: data, error: err })
    })
}