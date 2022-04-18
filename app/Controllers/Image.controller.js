const Image = require('../Models/Image.model');
var image = new Image();

exports.checkProduct = function (req, res, next) {
    image.checkImage(req.body, function (err, data) {
        if (err) { next(); }
        else { res.send({ data }); }
    })
}
// exports.getList = function (req, res) {
//     image.getList(function (err, data) {
//         res.send({ data: data, error: err })
//     })
// }
// exports.getById = function (req, res) {
//     image.getById(req.params.id, function (err, data) {
//         res.send({ data: data, error: err })
//     })
// }
exports.addNew = function (req, res) {
    image.addNews(req.body, function (err, data) {
        res.send({ data: { message: "SUCCESS", data }, error: err })
    })
}
exports.update = function (req, res) {
    image.update(req.params.id, req.body, function (err, data) {
        res.send({ data: data, error: err })
    })
}
exports.deleteImg = function (req, res) {
    image.deleteId(req.params.id, function (err, data) {
        res.send({ data: data, error: err })
    })
}
exports.getImages = async function (req, res) {
    image.getImage(function (err, data) {
        // product = data.find()
        // console.log(data)
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