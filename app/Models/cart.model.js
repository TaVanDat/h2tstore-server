const conn = require('../../connect');
const sql = require('mssql')
const moment = require('moment')

module.exports = function () {
    let sqlQuery;
    this.getAll = async function (id, result) {
        sqlQuery = "Select p.Id AS ProductId,p.Name,pm.SalePrice, pm.Quantity,pm.Size,pm.Color,pm.CartId,Cart.CustomerId,p.UnitOfMeasureId " +
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
                "INSERT INTO ProductCartMapping(ProductId,CartId,SalePrice,Quantity,Size,Color) VALUES (@productId,(SELECT TOP 1 Id FROM Cart WHERE CustomerId = @id),@salePrice,@quantity,@size,@color)"
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
    this.updateOrder = async function (newData, result) {
        sqlQuery = "insert into OrderProduct (Code,OrderDate,AccountId,Total,StatusId,Used,TransformMethod) values (@Code, @OrderDate, @AccountId, @Total, 3, 1, @TransformMethod) \n" +
            "SELECT TOP 1 Id FROM OrderProduct WHERE AccountId = @AccountId";
        const pool = await conn;
        return pool.request()
            .input('AccountId', sql.BigInt, newData.AccountId)
            .input('Code', sql.NVarChar, newData.Code)
            .input('OrderDate', sql.DateTime, moment(newData.OrderDate, 'DD-MM-YYYY').format('MM-DD-YYYY'))
            .input('Total', sql.Decimal, newData.Total)
            .input('TransformMethod', sql.NVarChar, newData.TransformMethod)
            .query(sqlQuery, function (err, rec) {
                if (!err) {
                    result(false, rec.recordset)
                }
                else { result(true, null) }
            })
    }
    this.updateOrderContent = async function (newData, result) {
        // sqlQuery = newData.map(item=>{
        //     return (`\n insert into OrderProductContent(ProductId,OrderProductId,UnitOfMeasureId,Quantity,Price,Amount) values (@ProductId, @OrderProductId, @UnitOfMeasureId, @Quantity, @Price, @Amount) \n`)
        // })
        // console.log(newData)
        sqlQuery = `insert into OrderProductContent(ProductId,OrderProductId,UnitOfMeasureId,Quantity,Price,Amount) values (${newData[0].ProductId},${newData[0].OrderProductId},${newData[0].UnitOfMeasureId},${newData[0].Quantity},${newData[0].Price},${newData[0].Amount})`
        for (let index = 1; index < newData.length; index++) {
            sqlQuery += `,(${newData[index].ProductId},${newData[index].OrderProductId},${newData[index].UnitOfMeasureId},${newData[index].Quantity},${newData[index].Price},${newData[index].Amount})`
        }
        // console.log(sqlQuery)
        const pool = await conn;
        return pool.request()
            // .input('OrderProductId', sql.BigInt, newData.OrderProductId)
            // .input('ProductId', sql.BigInt, newData.ProductId)
            // .input('UnitOfMeasureId', sql.BigInt, newData.UnitOfMeasureId)
            // .input('Quantity', sql.BigInt, newData.Quantity)
            // .input('Price', sql.Decimal, newData.SalePrice)
            // .input('Amount', sql.Decimal, newData.Amount)
            .query(sqlQuery, function (err, rec) {
                if (!err) {
                    // console.log(err)
                    result(false, { err })
                }
                else { result(true, { err }) }
            })
    }

    this.paymentCart = async function (CustomerId, result) {
        sqlQuery = "delete from ProductCartMapping where CartId = (SELECT top 1 Id FROM Cart WHERE CustomerId = @id) \n" +
            "delete from Cart where Id = (SELECT top 1 Id FROM Cart WHERE CustomerId = @id)";///sẽ bị lỗi khi nhiều cartId vậy nên thêm cả userId nữa
        // console.log(sqlQuery)
        const pool = await conn;
        return pool.request()
            .input('id', sql.BigInt, CustomerId)
            .query(sqlQuery, function (err, rec) {
                if (!err) {
                    result(false, { err })
                }
                else { result(true, { err }) }
            })
    }


    //lay danh sach san pham trong hoa don
    this.getProductOrder = async function (id, result) {
        sqlQuery = "SELECT ProductId, SUM(Quantity) AS 'TotalQuantity'" +
            "FROM OrderProductContent WHERE OrderProductId = @OrderProductId group by ProductId"
        const pool = await conn;
        return pool.request()
            .input('OrderProductId', sql.BigInt, id)
            .query(sqlQuery, function (err, rec) {
                if (rec.recordset.length > 0) {
                    result(false, rec.recordset);
                }
                else
                    result(true, []);
            })
    }

    //lay danh sach san pham trong bang sp
    this.getProductQuantity = async function (result) {
        sqlQuery = "SELECT Id, Quantity FROM Product"
        const pool = await conn;
        return pool.request()
            .query(sqlQuery, function (err, rec) {
                if (rec.recordset.length > 0) {
                    result(false, rec.recordset);
                }
                else
                    result(true, []);
            })
    }

    //tru so luong cua san pham trong bang sp
    this.updateQuantity = async function (data, result) {
        sqlQuery = `update Product set Quantity=${data[0].Quantity} where Id = ${data[0].ProductId}`
        for (let index = 1; index < data.length; index++) {
            sqlQuery += `\n update Product set Quantity=${data[index].Quantity} where Id = ${data[index].ProductId}`
        }
        // console.log(sqlQuery)
        const pool = await conn;
        return pool.request()
            .query(sqlQuery, function (err, rec) {
                if (!err) {
                    result(false, { err })
                }
                else { result(true, { err }) }
            })
    }
}