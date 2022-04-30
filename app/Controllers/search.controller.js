const { response } = require('express');
const SearchPro = require('../Models/search.model');
var searchPro = new SearchPro();

//count quantity all product
exports.countAll = function (req, res, next) {

    try {
        // let dataSearch = { q: req.query.q };
        searchPro.countSearch(function (err, data) {
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
// get all product search
exports.getProSearch = function (req, res) {
    let page_size, page, type, q, end, start;
    try {
        page = req.query.page ? req.query.page : 1;
        page_size = req.query.page_size ? req.query.page_size : 10;
        end = page_size > 0 ? page_size : 10;
        start = page > 0 ? (page - 1) * page_size : 0;
        type = req.query.type ? req.query.type : 'asc'; //type sort 
        title = req.query.title ? req.query.title : 'Id'; //title sort 
        searchString = req.query.q ? String(req.query.q) : ''; //compare character
        searchPro.getSearch({ type, title }, function (err, data) {
            if (err) return res.status(404).json({ data: { message: "Not Found" }, error: true })
            data = data.filter(item => {
                if (item.Name.includes(searchString.toLowerCase()) || item.Name.includes(searchString.toUpperCase())) {
                    return item
                }
            })
            totalRows = data.length
            newData = data.slice(start, end);
            data = newData.map((item, index, data) => {
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
                    "Size": item.Size ? item.Size.split(',') : null,
                    "Color": item.Color ? item.Color.split(',') : null
                }
            })
            pagination = page ? {
                "page": page > 0 ? Number(page) : 1,
                "page_size": page_size > 0 ? Number(page_size) : 10,
                "totalRows": totalRows
            } : { totalRows: totalRows }
            return res.send({ data: { message: "SUCCESS", data, pagination }, error: false })
        })
    } catch (error) {
        return res.status(500).json({ error });
    }
}