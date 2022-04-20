const conn = require('../../connect');
const sql = require('mssql')

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
            sqlQuery = `SELECT * FROM Product Where DeletedAt IS NULL ORDER BY Id OFFSET ${page} ROWS FETCH NEXT ${page_size} ROWS ONLY`;
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
        const sqlString = "delete from Product  where Id = @id";
        const pool = await conn
        return pool.request()
            .input('id', sql.BigInt, id)
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
        const sqlString = 'SELECT COUNT(*) AS TotalCoat FROM Product WHERE CategoryId =1 or CategoryId =2 or CategoryId=3'
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
            sqlQuery = `SELECT * FROM Product Where DeletedAt IS NULL AND CategoryId = 1 ORDER BY Id OFFSET ${page} ROWS FETCH NEXT ${page_size} ROWS ONLY`;
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
}
