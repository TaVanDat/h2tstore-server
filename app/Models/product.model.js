const conn = require('../../connect');
const sql = require('mssql')
const moment = require('moment')

//result is callback function
module.exports = function () {
    let page_size, page, sqlQuery;
    //count quantity all product
    this.count = async function (result) {
        const sqlString = 'SELECT COUNT(*) AS Total FROM Product WHERE DeletedAt IS NULL'
        const pool = await conn;
        return pool.request()
            .query(sqlString, function (err, response) {
                if (response.recordset.length > 0) { result(false, response.recordset); }
                else { result(true, null); }
            })
    }
    // get all product
    this.getAll = async function (data, result) {
        if (data) {
            page_size = data.page_size > 0 ? data.page_size : 10;
            page = data.page > 0 ? (data.page - 1) * page_size : 0;
            sqlQuery = `SELECT * FROM Product Where DeletedAt IS NULL ORDER BY ${data.title} ${data.type} OFFSET ${page} ROWS FETCH NEXT ${page_size} ROWS ONLY`;
        }
        else {
            sqlQuery = 'SELECT * FROM Product where DeletedAt is null';
        }
        // const sqlString = !data ? sqlString2 : sqlString1
        const pool = await conn
        return pool.request()
            .query(sqlQuery, function (error, rec) {
                if (rec.recordset.length > 0) {
                    result(null, rec.recordset);
                }
                else
                    result(true, null);
            })
    }
    this.getDetail = async function (id, result) {
        const sqlString = 'SELECT * FROM Product where Id = @id';
        const pool = await conn
        return pool.request()
            .input('id', sql.BigInt, id)
            .query(sqlString, function (err, rec) {
                if (rec.recordset.length > 0) {
                    result(null, rec.recordset);
                }
                else
                    result(true, null);
            })
    }
    this.checkProduct = async function (newData, result) {
        const sqlString1 = 'Select Id,Code From Product Where Code = @code or Id = @id'
        const pool = await conn
        return pool.request()
            .input('id', sql.BigInt, newData.id)
            .input('code', sql.NVarChar, newData.Code)
            .query(sqlString1, function (error, rec) {
                if (rec.recordset.length > 0) {
                    result(false, rec.recordset);
                }
                else
                    result(true, {});
            })
    }
    this.addNews = async function (newData, result) {
        const sqlString = "INSERT INTO Product (Code,Name,Description,Price,StatusId,UnitOfMeasureId,SalePrice,Quantity,CategoryId,BuyerStoreId,Image,Size) VALUES(@code,@name,@description,@price,1,@unitOfMeasureId,@salePrice,@quantity,@categoryId,@buyerStoreId,@image,@size)";
        const pool = await conn
        return pool.request()
            .input('code', sql.NVarChar, newData.Code)
            .input('name', sql.NVarChar, newData.Name)
            .input('description', sql.NVarChar, newData.Description)
            .input('price', sql.Decimal, newData.Price)
            .input('unitOfMeasureId', sql.BigInt, newData.UnitOfMeasureId)
            .input('salePrice', sql.Decimal, newData.SalePrice)
            .input('quantity', sql.Decimal, newData.Quantity)
            .input('categoryId', sql.BigInt, newData.CategoryId)
            .input('buyerStoreId', sql.BigInt, newData.BuyerStoreId)
            .input('image', sql.NVarChar, newData.Image)
            .input('size', sql.NVarChar, newData.Size)
            .query(sqlString, function (err, rec) {
                if (!err) {
                    result(null, { message: "SUCCESS" })
                }
                else { result(true, { message: "FAILED", statusCode: 400, status: 'Bad Request' }) }
            })
    }
    this.update = async function (id, newData, result) {
        const sqlString = "update Product set Name = @name, Description = @description, Price = @price, StatusId = @statusId, UnitOfMeasureId = @unitOfMeasureId, SalePrice = @salePrice, Quantity = @quantity, CategoryId = @categoryId, BuyerStoreId = @buyerStoreId, Image = @image, Size = @size where Id = @id";
        const pool = await conn
        return pool.request()
            .input('id', sql.BigInt, id)
            .input('name', sql.NVarChar, newData.Name)
            .input('description', sql.NVarChar, newData.Description)
            .input('price', sql.Decimal, newData.Price)
            .input('statusId', sql.BigInt, newData.StatusId)
            .input('unitOfMeasureId', sql.BigInt, newData.UnitOfMeasureId)
            .input('salePrice', sql.Decimal, newData.SalePrice)
            .input('quantity', sql.Decimal, newData.Quantity)
            .input('categoryId', sql.BigInt, newData.CategoryId)
            .input('buyerStoreId', sql.BigInt, newData.BuyerStoreId)
            .input('image', sql.NVarChar, newData.Image)
            .input('size', sql.NVarChar, newData.Size)
            .query(sqlString, function (err, response) {
                if (!err) {
                    result(null, { message: "Thành công!", status: 200 })
                }
                else result(true, { message: "Không thành công!" })
            })

    }
    this.deleteId = async function (id, result) {
        const sqlString = "update Product set DeletedAt = @DeletedAt  where Id = @id";
        const pool = await conn
        return pool.request()
            .input('id', sql.BigInt, id)
            .input('DeletedAt', sql.DateTime, moment(new Date()).format("MM-DD-YYYY"))
            .query(sqlString, function (err, rec) {
                if (!err) {
                    result(null, { message: "Xóa thành công!" });
                }
                else
                    result(true, { message: "Xóa không thành công!" });
            })
    }
    // lay het cac san pham loai ao
    this.countCoat = async function (result) {
        const sqlString = "select COUNT(*) AS TotalCoat " +
            "from Product join Category on Product.CategoryId = Category.Id " +
            "where Product.DeletedAt IS NULL and Category.Code = 'ao'"
        const pool = await conn;
        return pool.request()
            .query(sqlString, function (err, response) {
                if (response.recordset.length > 0) { result(false, response.recordset); }
                else { result(true, null); }
            })
    }
    this.getCoat = async function (data, result) {
        if (data) {
            page_size = data.page_size > 0 ? data.page_size : 10;
            page = data.page > 0 ? (data.page - 1) * page_size : 0;
            sqlQuery = `select Product.Id,Product.Code,Product.Name,Description,Price,Product.StatusId,UnitOfMeasureId,SalePrice,Quantity,Count,CategoryId,BuyerStoreId,Product.CreatedAt,Product.UpdatedAt,Product.Image,Size
            from Product JOIN Category on Product.CategoryId = Category.Id where Product.DeletedAt IS NULL and Category.Code = 'ao' `
                + ` ORDER BY ${data.title} ${data.type} OFFSET ${page} ROWS FETCH NEXT ${page_size} ROWS ONLY`;
        }
        else {
            sqlQuery = "select Product.Id,Product.Code,Product.Name,Description,Price,Product.StatusId,UnitOfMeasureId,SalePrice,Quantity,Count,CategoryId,BuyerStoreId,Product.CreatedAt,Product.UpdatedAt,Product.Image,Size " +
                "from Product join Category on Product.CategoryId = Category.Id where Product.DeletedAt IS NULL and Category.Code = 'ao'";
        }
        // const sqlString = !data ? sqlString2 : sqlString1
        const pool = await conn
        return pool.request()
            .query(sqlQuery, function (error, rec) {
                if (rec.recordset.length > 0) {
                    result(null, rec.recordset);
                }
                else
                    result(true, null);
            })
    }


    //get all product have category is Pant
    this.countCoatPant = async function (result) {
        const sqlString = "select COUNT(*) AS TotalPant " +
            "from Product join Category on Product.CategoryId = Category.Id " +
            "where Product.DeletedAt IS NULL and Category.Code = 'quan'"
        const pool = await conn;
        return pool.request()
            .query(sqlString, function (err, response) {
                if (response.recordset.length > 0) { result(false, response.recordset); }
                else { result(true, null); }
            })
    }
    this.getCoatPant = async function (data, result) {
        if (data) {
            page_size = data.page_size > 0 ? data.page_size : 10;
            page = data.page > 0 ? (data.page - 1) * page_size : 0;
            sqlQuery = `select Product.Id,Product.Code,Product.Name,Description,Price,Product.StatusId,UnitOfMeasureId,SalePrice,Quantity,Count,CategoryId,BuyerStoreId,Product.CreatedAt,Product.UpdatedAt,Product.Image,Size
            from Product JOIN Category on Product.CategoryId = Category.Id where Product.DeletedAt IS NULL and Category.Code = 'quan' `
                + ` ORDER BY ${data.title} ${data.type} OFFSET ${page} ROWS FETCH NEXT ${page_size} ROWS ONLY`;
        }
        else {
            sqlQuery = "select Product.Id,Product.Code,Product.Name,Description,Price,Product.StatusId,UnitOfMeasureId,SalePrice,Quantity,Count,CategoryId,BuyerStoreId,Product.CreatedAt,Product.UpdatedAt,Product.Image,Size " +
                "from Product join Category on Product.CategoryId = Category.Id where Product.DeletedAt IS NULL and Category.Code = 'quan'";
        }
        // const sqlString = !data ? sqlString2 : sqlString1
        const pool = await conn
        return pool.request()
            .query(sqlQuery, function (error, rec) {
                if (rec.recordset.length > 0) {
                    result(null, rec.recordset);
                }
                else
                    result(true, null);
            })
    }





    //get category follow CategoryId
    this.countProductCategory = async function (id, result) {
        const sqlString = 'SELECT COUNT(*) AS TotalCoat FROM Product WHERE CategoryId = @id and DeletedAt IS NULL'
        const pool = await conn;
        return pool.request()
            .input('id', sql.BigInt, Number(id))
            .query(sqlString, function (err, response) {
                if (response.recordset.length > 0) { result(false, response.recordset); }
                else { result(true, null); }
            })
    }
    this.getProductCategory = async function (id, data, result) {
        if (data) {
            page_size = data.page_size > 0 ? data.page_size : 10;
            page = data.page > 0 ? (data.page - 1) * page_size : 0;
            sqlQuery = `SELECT * FROM Product Where CategoryId = @id and DeletedAt IS NULL ORDER BY ${data.title} ${data.type} OFFSET ${page} ROWS FETCH NEXT ${page_size} ROWS ONLY`;
        }
        else {
            sqlQuery = 'SELECT * FROM Product where CategoryId = @id and DeletedAt IS NULL';
        }
        const pool = await conn
        return pool.request()
            .input('id', sql.BigInt, Number(id))
            .query(sqlQuery, function (error, rec) {
                if (rec.recordset.length > 0) {
                    result(null, rec.recordset);
                }
                else
                    result(true, null);
            })
    }

    // get all sale75

    this.getAllSale75 = async function (data, result) {
        if (data) {
            sqlQuery = `SELECT * FROM Product Where Price<>SalePrice and DeletedAt IS NULL ORDER BY ${data.title} ${data.type}`;
        }
        else {
            sqlQuery = 'SELECT * FROM Product where Price<>SalePrice and DeletedAt IS NULL';
        }
        const pool = await conn
        return pool.request()
            .query(sqlQuery, function (error, rec) {
                if (rec.recordset.length > 0) {
                    result(null, rec.recordset);
                }
                else
                    result(true, null);
            })
    }


    //get all product have category is Balo
    this.countCoatBalo = async function (result) {
        const sqlString = 'SELECT COUNT(*) AS TotalCoat FROM Product WHERE CategoryId = 9  and DeletedAt IS NULL'
        const pool = await conn;
        return pool.request()
            .query(sqlString, function (err, response) {
                if (response.recordset.length > 0) { result(false, response.recordset); }
                else { result(true, null); }
            })
    }
    this.getCoatBalo = async function (data, result) {
        if (data) {
            page_size = data.page_size > 0 ? data.page_size : 10;
            page = data.page > 0 ? (data.page - 1) * page_size : 0;
            sqlQuery = `SELECT * FROM Product Where CategoryId = 9 and DeletedAt IS NULL ORDER BY Id OFFSET ${page} ROWS FETCH NEXT ${page_size} ROWS ONLY`;
        }
        else {
            sqlQuery = 'SELECT * FROM Product where CategoryId = 9 and DeletedAt IS NULL';
        }
        const pool = await conn
        return pool.request()
            .query(sqlQuery, function (error, rec) {
                if (rec.recordset.length > 0) {
                    result(null, rec.recordset);
                }
                else
                    result(true, null);
            })
    }


    //get list Latest product
    this.getLatestProduct = async function (result) {
        sqlQuery = "SELECT TOP 15 p.Id,p.Code,p.Name,p.Description,p.Price,p.SalePrice,p.Quantity,p.CategoryId,p.CreatedAt,p.Color,p.Image,p.Size " +
            "FROM Product p JOIN Category c ON p.CategoryId = c.Id " +
            "WHERE p.DeletedAt IS NULL and Price = SalePrice and (c.Code ='ao' or c.Code = 'quan') ORDER BY p.CreatedAt DESC";
        const pool = await conn
        return pool.request()
            .query(sqlQuery, function (err, rec) {
                if (rec.recordset.length > 0) {
                    result(null, rec.recordset);
                }
                else
                    result(true, null);
            })
    }
    this.getSaleProduct = async function (result) {
        sqlQuery = 'SELECT TOP (15) * FROM Product WHERE DeletedAt IS NULL and Price<>SalePrice ORDER BY CreatedAt DESC';
        const pool = await conn
        return pool.request()
            .query(sqlQuery, function (err, rec) {
                if (rec.recordset.length > 0) {
                    result(null, rec.recordset);
                }
                else
                    result(true, null);
            })
    }
    this.getRelative = async function (id, CategoryId, result) {
        sqlQuery = 'SELECT top 10 * FROM Product WHERE CategoryId = @CategoryId and Id <> @id and DeletedAt IS NULL ORDER BY NEWId()';
        const pool = await conn
        return pool.request()
            .input('CategoryId', sql.BigInt, Number(CategoryId))
            .input('id', sql.BigInt, Number(id))
            .query(sqlQuery, function (err, rec) {
                if (rec.recordset.length > 0) {
                    result(null, rec.recordset);
                }
                else
                    result(true, null);
            })
    }
}
