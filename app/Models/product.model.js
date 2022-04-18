const conn = require('../../connect');
const sql = require('mssql')

//result is callback function
module.exports = function () {
    this.getAll = async function (result) {
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
        const sqlString1 = 'Select Id,Code From Image Where Code = @code'
        const pool = await conn
        return pool.request()
            .input('code', sql.NVarChar, newData.Code)
            .query(sqlString1, function (error, rec) {
                if (rec.recordset.length > 0) {
                    result(false, rec.recordset);
                }
                else
                    result(true, { message: 'Product is exist!' });
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
                    result(null, newData)
                }
                else { result(true, { message: "Thêm không thành công!" }) }
            })
    }
    this.update = async function (id, newData, result) {
        const sqlString = "update Image set Code = @code, Name = @name, Color= @color where Id = @id";
        const pool = await conn
        return pool.request()
            .input('id', sql.Int, id)
            .input('code', sql.NVarChar, String(newData.Code))
            .input('name', sql.NVarChar, newData.Name)
            .input('color', sql.NVarChar, newData.Color)
            .query(sqlString, function (err, response) {
                if (!err) {
                    result(null, { message: "Thành công!", status: 200 })
                }
                else result(true, { message: "Không thành công!" })
            })

    }
    this.deleteId = async function (id, result) {
        const sqlString = "delete from Image  where Id = @id";
        const pool = await conn
        return pool.request()
            .input('id', sql.Int, id)
            .query(sqlString, function (err, rec) {
                if (!err) {
                    result(null, { message: "Xóa thành công!" });
                }
                else
                    result(true, { message: "Xóa không thành công!" });
            })
    }
    this.getProduct = async function (newData, result) {
        const sqlString1 = 'Select Email From Product Where Code = @code'
        const pool = await conn
        return pool.request()
            .input('code', sql.NVarChar, newData.Code)
            .query(sqlString1, function (error, rec) {
                if (rec.recordset.length > 0) {
                    result(false, rec.recordset);
                }
                else
                    result(true, { message: 'Product is exist!' });
            })
    }
}
