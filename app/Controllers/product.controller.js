const Product = require('../Models/product.model');
var product = new Product();
let type, title, end, start;
const objectCheck = { Id: 'Id', Name: 'Name', Code: 'Code', Price: 'Price', SalePrice: 'SalePrice', CreatedAt: 'CreatedAt', Quantity: 'Quantity', Count: 'Count' }
const objectType = { asc: 'asc', desc: 'desc', ASC: 'ASC', DESC: 'DESC' }
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
        type = req.query.type ? (objectType.hasOwnProperty(req.query.type) ? req.query.type : 'asc') : 'asc'; //type sort
        title = req.query.title ? (objectCheck.hasOwnProperty(req.query.title) ? req.query.title : 'Id') : 'Price'; //title sort
        let dataPage = req.query.page ? { page: req.query.page, page_size: req.query.page_size, type, title } : null
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
                    "Size": item.Size ? item.Size.split(',') : null,
                    "Color": item.Color ? item.Color.split(',') : null
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
                "Size": data[0].Size ? data[0].Size.split(',') : null,
                "Color": data[0].Color ? data[0].Color.split(',') : null
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
        type = req.query.type;
        title = req.query.title
        type = type ? (objectType.hasOwnProperty(type) ? type : 'asc') : 'asc'; //type sort
        title = title ? (objectCheck.hasOwnProperty(title) ? title : 'Id') : 'Price'; //title sort
        let dataPage = req.query.page ? { page: req.query.page, page_size: req.query.page_size, title, type } : null
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



//get product coat Pant
exports.countAllCoatPant = function (req, res, next) {
    try {
        product.countCoatPant(function (err, data) {
            if (err) return res.sendStatus(500)
            else {
                req.countPage = data[0].TotalPant;
                next();
            }
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}

exports.getListCoatPant = function (req, res) {
    try {
        type = req.query.type ? (objectType.hasOwnProperty(req.query.type) ? req.query.type : 'asc') : 'asc'; //type sort
        title = req.query.title ? (objectCheck.hasOwnProperty(req.query.title) ? req.query.title : 'Id') : 'Price'; //title sort
        let dataPage = req.query.page ? { page: req.query.page, page_size: req.query.page_size, title, type } : null
        product.getCoatPant(dataPage, function (err, data) {
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



//get product follow CategoryId from params

exports.countAllCategoryId = function (req, res, next) {
    try {
        if (!Number(req.params.id)) return res.status(400).json({ data: { message: "Bad Request" }, error: true })
        product.countProductCategory(req.params.id, function (err, data) {
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

exports.getProductCategoryId = function (req, res) {
    try {
        type = req.query.type ? (objectType.hasOwnProperty(req.query.type) ? req.query.type : 'asc') : 'asc'; //type sort
        title = req.query.title ? (objectCheck.hasOwnProperty(req.query.title) ? req.query.title : 'Id') : 'Price'; //title sort
        let dataPage = req.query.page ? { page: req.query.page, page_size: req.query.page_size, title, type } : null
        product.getProductCategory(req.params.id, dataPage, function (err, data) {
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

exports.getLatest = function (req, res) {
    try {
        product.getLatestProduct(function (err, data) {
            if (err) return res.status(404).json({ data: { message: "Not Found" }, error: err })
            data = data.map((item, index, data) => {
                return {
                    "Id": item.Id,
                    "Code": item.Code,
                    "Name": item.Name,
                    "Description": item.Description,
                    "Price": item.Price,
                    "SalePrice": item.SalePrice,
                    "Quantity": item.Quantity,
                    "Count": item.Count,
                    "CategoryId": item.CategoryId,
                    "CreatedAt": item.CreatedAt,
                    "Image": item.Image ? item.Image.split(',') : null,
                    "Size": item.Size ? item.Size?.split(',') : null
                }
            })

            return res.send({ data: { message: "SUCCESS", data }, error: false })
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}
exports.getSaleProduct75 = function (req, res) {
    try {
        product.getSaleProduct(function (err, data) {
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

            return res.send({ data: { message: "SUCCESS", data }, error: false })
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}

exports.getRelativeProduct = function (req, res) {
    try {
        let id = req.query.id;
        let categoryId = req.query.category_id;
        if (id && categoryId) {
            if (!Number(id) && !Number(categoryId)) { return res.status(400).json({ data: { message: "Bad Request!" } }) }
            product.getRelative(id, categoryId, function (err, data) {
                if (err) return res.status(404).json({ data: { message: "Not Found" }, error: true })
                data = data.map((item, index, data) => {
                    return {
                        "Id": item.Id,
                        "Code": item.Code,
                        "Name": item.Name,
                        "Description": item.Description,
                        "Price": item.Price,
                        "SalePrice": item.SalePrice,
                        "Quantity": item.Quantity,
                        "Count": item.Count,
                        "CategoryId": item.CategoryId,
                        "Image": item.Image ? item.Image.split(',') : null,
                        "Size": item.Size ? item.Size.split(',') : null
                    }
                })

                return res.send({ data: { message: "SUCCESS", data }, error: false })
            })
        }
        else {
            return res.status(400).json({ data: { message: "Bad Request!" } })
        }
    } catch (error) {
        return res.sendStatus(500);
    }
}


//get all sale75
exports.getAllSaleProduct = function (req, res) {
    try {
        const objectSale = { 'thun-short': 'thun-short', 'somi-dai': 'somi-dai', 'ao-nu': 'ao-nu' }
        let page_size, page, page_link, dataFilter;
        page_link = req.query.page_link ? req.query.page_link : ''
        type = req.query.type;
        title = req.query.title;
        page = req.query.page ? req.query.page : 1;
        page_size = req.query.page_size ? req.query.page_size : 10;
        end = page_size > 0 ? page * page_size : 10;
        start = page > 0 ? (page - 1) * page_size : 0;
        page_link = page_link ? (objectSale.hasOwnProperty(page_link) ? page_link : false) : 'r'
        type = type ? (objectType.hasOwnProperty(type) ? type : 'asc') : 'asc'; //type sort
        title = title ? (objectCheck.hasOwnProperty(title) ? title : 'Price') : 'Price'; //title sort
        product.getAllSale75({ title, type }, function (err, data) {
            if (err) return res.status(404).json({ data: { message: "Not Found" }, error: true })
            if (page_link === false) { return res.status(404).json({ data: { message: "Not Found" }, error: true }) }
            // console.log(page_link)
            else {
                switch (page_link) {
                    case 'r':
                        dataFilter = data.map(item => item)
                        break;
                    case 'thun-short':
                        dataFilter = data.filter(item => {
                            if (item.CategoryId === '1' || item.CategoryId === '5') { return item }
                        })
                        break;
                    case 'somi-dai':
                        dataFilter = data.filter(item => {
                            if (item.CategoryId === '3' || item.CategoryId === '7') { return item }
                        })
                        break;

                    case 'ao-nu':
                        dataFilter = data.filter(item => {
                            if (item.CategoryId === '11') { return item }
                        })
                        break;

                }

                totalRows = dataFilter.length
                const nextData = dataFilter.slice(start, end);
                lastData = nextData.map((item, index, data) => {
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
                    "page": page > 0 ? Number(page) : 1,
                    "page_size": page_size > 0 ? Number(page_size) : 10,
                    "totalRows": totalRows
                } : { "totalRows": totalRows }
                return res.send({ data: { message: "SUCCESS", data: lastData, pagination }, error: false })
            }
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}


//get sale ao thun - quan short

exports.getSaleThunShort = function (req, res) {
    try {
        let page_size, page, page_link;
        page_link = req.query.page_link ? req.query.page_link : '';
        type = req.query.type;
        title = req.query.title;
        page = req.query.page ? req.query.page : 1;
        page_size = req.query.page_size ? req.query.page_size : 10;
        end = page_size > 0 ? page * page_size : 10;
        start = page > 0 ? (page - 1) * page_size : 0;
        type = type ? (objectType.hasOwnProperty(type) ? type : 'asc') : 'asc'; //type sort
        title = title ? (objectCheck.hasOwnProperty(title) ? title : 'Price') : 'Price'; //title sort
        product.getAllSale75({ title, type }, function (err, data) {
            if (err) return res.status(404).json({ data: { message: "Not Found" }, error: true })
            data = data.filter(item => {
                if (item.CategoryId === 1 || item.CategoryId === 5)
                    return item
            })
            totalRows = data.length;
            const nextData = data.slice(start, end);
            lastData = nextData.map((item, index, data) => {
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
            totalRows = data.length;
            pagination = req.query.page ? {
                "page": req.query.page > 0 ? Number(req.query.page) : 1,
                "page_size": req.query.page_size > 0 ? Number(req.query.page_size) : 10,
                "totalRows": totalRows
            } : { "totalRows": totalRows }
            return res.send({ data: { message: "SUCCESS", data: lastData, pagination }, error: false })
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}