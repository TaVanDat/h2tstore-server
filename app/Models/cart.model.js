const conn = require('../../connect');
const sql = require('mssql')

module.exports = function () {
    let sqlQuery;
    this.getAll = async function (id, result) {
        sqlQuery = "Select p.Id AS ProductId,p.Name,pm.SalePrice, pm.Quantity,pm.Size,pm.Color,pm.CartId,Cart.CustomerId " +
            "From ProductCartMapping pm join Cart on pm.CartId = Cart.Id" +
            " join Product p on pm.ProductId = p.Id  where CustomerId = @id"
        const pool = await conn
        return pool.request()
            .input('id', sql.BigInt, id)
            .query(sqlQuery, function (error, rec) {
                if (rec.recordset.length > 0) {
                    result(false, rec.recordset);
                }
                else
                    result(true, []);
            })

    }

    //gio han rong
    this.addEmptyCart = async function (newData, result) {
        if (newData) { //có cùng user
            sqlQuery = "INSERT INTO Cart(CustomerId,TotalPrice,TotalQuantity) VALUES(@id,@totalPrice,@totalQuantity) \n" +
                "INSERT INTO ProductCartMapping(ProductId,CartId,SalePrice,Quantity,Size,Color) VALUES (@productId,(SELECT Id FROM Cart WHERE CustomerId = @id),@salePrice,@quantity,@size,@color)"
            const pool = await conn;
            return pool.request()
                .input('id', sql.BigInt, newData.CustomerId)
                .input('totalQuantity', sql.Decimal, newData.TotalQuantity)
                .input('totalPrice', sql.Decimal, newData.TotalPrice)
                .input('productId', sql.BigInt, newData.ProductId)
                .input('salePrice', sql.Decimal, newData.SalePrice)
                .input('quantity', sql.Decimal, newData.Quantity)
                .input('size', sql.NVarChar, newData.Size)
                .input('color', sql.NVarChar, newData.Color)
                .query(sqlQuery, function (err, rec) {
                    if (!err) {
                        result(false, { err })
                    }
                    else { result(true, { err }) }
                })
        }
        else {
            result(true, { message: "ADD CART FAILED", statusCode: 400, status: 'Bad Request' })
        }
    }


    this.updateCart = async function (newData, result) {

        newData.checkSizeColor ? (//cung user,co san pham cung Size,Color => tang so luong, gia theo CartId, ProductId
            sqlQuery = "UPDATE ProductCartMapping SET Quantity = @quantity  WHERE CartId = (SELECT Top 1 Id FROM Cart WHERE CustomerId = @id) AND ProductId = @productId AND Size = @size AND Color = @color" +
            "\nUPDATE Cart SET TotalQuantity = @totalQuantity, TotalPrice = @totalPrice WHERE CustomerId = @id \n "

        ) : (//co cung user, khac size,color =>them moi theo  CartId, userId
            sqlQuery =
            " UPDATE Cart SET TotalQuantity = @totalQuantity, TotalPrice = @totalPrice WHERE CustomerId = @id " +
            "\nINSERT INTO ProductCartMapping(ProductId,CartId,SalePrice,Quantity,Size,Color) VALUES (@productId,(SELECT Top 1 Id FROM Cart WHERE CustomerId = @id),@salePrice,@quantity,@size,@color) \n"
        )
        const pool = await conn;
        return pool.request()
            .input('id', sql.BigInt, newData.CustomerId)
            .input('totalQuantity', sql.Decimal, Number(newData.TotalQuantity))
            .input('totalPrice', sql.Decimal, Number(newData.TotalPrice))
            .input('productId', sql.BigInt, newData.ProductId)
            .input('salePrice', sql.Decimal, newData.SalePrice)
            .input('quantity', sql.Decimal, newData.Quantity)
            .input('size', sql.NVarChar, newData.Size)
            .input('color', sql.NVarChar, newData.Color)
            .query(sqlQuery, function (err, rec) {
                if (!err) {
                    result(false, { err })
                }
                else { result(true, { err }) }
            })
        // }
        // else {
        //     result(true, { message: "ADD CART FAILED", statusCode: 400, status: 'Bad Request' })
        // }
    }
    this.deleteCart = async function (newData, result) {
        sqlQuery = "delete from ProductCartMapping where CartId = (SELECT top 1 Id FROM Cart WHERE CustomerId = @id) AND Size = @size AND Color = @color AND ProductId = @productId"
        const pool = await conn;
        return pool.request()
            .input('id', sql.BigInt, newData.CustomerId)
            .input('productId', sql.BigInt, newData.ProductId)
            .input('size', sql.NVarChar, newData.Size)
            .input('color', sql.NVarChar, newData.Color)
            .query(sqlQuery, function (err, rec) {
                if (!err) {
                    result(false, { err })
                }
                else { result(true, { err }) }
            })
    }
}