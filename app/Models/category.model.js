const conn = require('../../connect');
const sql = require('mssql')

module.exports = function () {
    let page_size, page, sqlQuery;
    //count quantity all Category
    this.count = async function (result) {
        const sqlString = 'SELECT COUNT(*) AS Total FROM Category'
        const pool = await conn;
        return pool.request()
            .query(sqlString, function (err, response) {
                if (response.recordset.length > 0) { result(false, response.recordset); }
                else { result(true, null); }
            })
    }
    // get all Category
    this.getAll = async function (data, result) {
        if (data) {
            page_size = data.page_size > 0 ? data.page_size : 10;
            page = data.page > 0 ? (data.page - 1) * page_size : 0;
            sqlQuery = `SELECT * FROM Category ORDER BY Id OFFSET ${page} ROWS FETCH NEXT ${page_size} ROWS ONLY`;
        }
        else {
            sqlQuery = 'SELECT * FROM Category';
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
        const sqlString = 'SELECT * FROM Category where Id = @id';
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
    this.checkCategory = async function (id, result) {
        const sqlString1 = 'Select Id,Code From Category Where Id = @id'
        const pool = await conn
        return pool.request()
            .input('id', sql.BigInt, id)
            .query(sqlString1, function (error, rec) {
                if (rec.recordset.length > 0) {
                    result(false, rec.recordset);
                }
                else
                    result(true, {});
            })
    }
    this.addNews = async function (newData, result) {
        const sqlString = "INSERT INTO Category (Code,Name,StatusId,Image) VALUES(@code,@name,1,@image)";
        const pool = await conn
        return pool.request()
            .input('code', sql.NVarChar, newData.Code)
            .input('name', sql.NVarChar, newData.Name)
            .input('image', sql.NVarChar, newData.Image)
            .query(sqlString, function (err, rec) {
                if (!err) {
                    result(null, { message: "SUCCESS" })
                }
                else { result(true, { message: "FAILED", statusCode: 400, status: 'Bad Request' }) }
            })
    }
    this.update = async function (id, newData, result) {
        const sqlString = "update Category set Name = @name, StatusId = @statusId,Used = @used, Image = @image where Id = @id";
        const pool = await conn
        return pool.request()
            .input('id', sql.BigInt, id)
            .input('name', sql.NVarChar, newData.Name)
            .input('statusId', sql.BigInt, newData.StatusId ? newData.StatusId : 1)
            .input('used', sql.BigInt, newData.Used ? newData.Used : 0)
            .input('image', sql.NVarChar, newData.Image)
            .query(sqlString, function (err, response) {
                if (!err) {
                    result(null, { message: "Thành công!", status: 200 })
                }
                else result(true, { message: "Không thành công!" })
            })

    }
}