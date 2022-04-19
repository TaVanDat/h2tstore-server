const conn = require('../../connect');
const sql = require('mssql')

//result is callback function
module.exports = function () {
    // get all product
    this.getAll = async function (data, result) {
        if (data) {
            let page_size = data.page_size;
            let page = (data.page - 1) * 10;
            const sqlString = `SELECT * FROM Product Where DeletedAt IS NULL ORDER BY Id OFFSET ${page} ROWS FETCH NEXT ${page_size} ROWS ONLY`;
            const pool = await conn
            return pool.request()
                .query(sqlString, function (error, rec) {
                    if (rec.recordset.length > 0) {
                        result(null, rec.recordset);
                    }
                    else
                        result(true, null);
                })
        }
        else {
            const sqlString = 'SELECT * FROM Product where DeletedAt is null';
            const pool = await conn
            return pool.request()
                .query(sqlString, function (error, rec) {
                    if (rec.recordset.length > 0) {
                        result(null, rec.recordset);
                    }
                    else
                        result(true, null);
                })
        }
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
    //Phân trang tất cả sản phẩm
    this.getAllPage = async function (data, result) {
        let page_size = data.page_size;
        let page = (data.page - 1) * 10;
        const sqlString = `SELECT * FROM Product Where DeletedAt IS NULL ORDER BY Id OFFSET ${page} ROWS FETCH NEXT ${page_size} ROWS ONLY`;
        const pool = await conn
        return pool.request()
            .query(sqlString, function (error, rec) {
                if (rec.recordset.length > 0) {
                    result(null, rec.recordset);
                }
                else
                    result(true, null);
            })
    }
}
