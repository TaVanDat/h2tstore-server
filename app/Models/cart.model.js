const conn = require('../../connect');
const sql = require('mssql')

module.exports = function () {
    let sqlQuery;
    this.getAll = async function (id, result) {
        sqlQuery = "Select p.Id AS ProductId,p.Name,SalePrice, pm.Quantity,pm.Size,pm.Color " +
            "From ProductCartMapping pm join Cart on pm.CartId = Cart.Id" +
            " join Product p on pm.ProductId = p.Id  where CustomerId = @id"
        const pool = await conn
        return pool.request()
            .input('id', sql.BigInt, id)
            .query(sqlQuery, function (error, rec) {
                if (rec.recordset.length > 0) {
                    result(null, rec.recordset);
                }
                else
                    result(true, null);
            })

    }

    //check CustomerId from database, id get from token
    this.checkUser = async function (id, result) {
        const sqlString = "Select * from Cart Where CustomerId = @id"
        const pool = await conn
        return pool.request()
            .input('id', sql.BigInt, id)
            .query(sqlString, function (err, response) {
                if (!err) {
                    result(false, response.recordset) // trùng CustomerId
                }
                else { result(true, null) } // không trùng CustomerId
            })
    }
    this.addNews = async function (olderData, newData, result) {
        if (olderData) { //có cùng user
            sqlQuery = "UPDATE Cart SET TotalQuantity = @totalQuantity, TotalPrice = @totalPrice WHERE CustomerId = @id \n" + "GO\n" +
                "INSERT INTO ProductCartMapping (ProductId,CartId,SalePrice,Quantity,Size,Color) VALUES (@productId,@cartId,@salePrice,@quantity,@size,@color)"
            const pool = await conn;
            return pool.request()
                .input('id', sql.BigInt, olderData.CustomerId)
                .input('totalQuantity', sql.Decimal, Number(newData.TotalQuantity) + Number(olderData.TotalQuantity))
                .input('totalPrice', sql.Decimal, Number(newData.TotalPrice) + Number(olderData.TotalPrice))
                .input('productId', sql.BigInt, newData.ProductId)
                .input('cartId', sql.BigInt, olderData.CartId)
                .input('quantity', sql.Decimal, newData.QuantityUser)
                .input('salePrice', sql.Decimal, newData.SalePrice)
                .input('size', sql.NVarChar, newData.Size)
                .input('color', sql.NVarChar, newData.Color)
                .query(sqlQuery, function (err, rec) {
                    if (!err) {
                        result(null, { message: "SUCCESS" })
                    }
                    else { result(true, { message: "FAILED", statusCode: 400, status: 'Bad Request' }) }
                })
        }
        else {
            result(true, { message: "ADD CART FAILED", statusCode: 400, status: 'Bad Request' })
        }
    }


}