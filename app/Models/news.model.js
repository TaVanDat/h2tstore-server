//SELECT TOP (4) * FROM News WHERE DeletedAt IS NULl ORDER BY CreatedAt DESC
const conn = require('../../connect');
const sql = require('mssql')

//result is callback function
module.exports = function () {
    let sqlQuery;
    this.getAll = async function (result) {
        sqlQuery = 'SELECT * FROM News WHERE DeletedAt IS NULL';
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
    this.getLatest = async function (result) {
        sqlQuery = 'SELECT TOP (4) * FROM News WHERE DeletedAt IS NULl ORDER BY CreatedAt DESC';
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
    this.getDetail = async function (id, result) {
        const sqlString = 'SELECT * FROM News WHERE DeletedAt IS NULl and Id = @id';
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


    this.addNews = async function (newData, result) {
        const sqlString = "insert into News(Name,Content,Title,Image) values(@Name,@Content,@Title,@Image)";
        const pool = await conn
        return pool.request()
            .input('Name', sql.NVarChar, newData.Name)
            .input('Content', sql.NVarChar, newData.Content)
            .input('Title', sql.NVarChar, newData.Title)
            .input('Image', sql.NVarChar, newData.Image)
            .query(sqlString, function (err, response) {
                if (!err) {
                    result(null, { message: "Thành công!", status: 200 })
                }
                else result(true, { message: "Không thành công!" })
            })

    }


    this.update = async function (id, newData, result) {
        const sqlString = "update News set Name = @Name, Content = @Content, Title = @Title, Image = @Image where Id = @id";
        const pool = await conn
        return pool.request()
            .input('id', sql.BigInt, id)
            .input('Name', sql.NVarChar, newData.Name)
            .input('Content', sql.NVarChar, newData.Content)
            .input('Title', sql.NVarChar, newData.Title)
            .input('Image', sql.NVarChar, newData.Image)
            .query(sqlString, function (err, response) {
                if (!err) {
                    result(null, { message: "Thành công!", status: 200 })
                }
                else result(true, { message: "Không thành công!" })
            })

    }
    this.delete = async function (id, result) {
        const sqlString = "DELETE FROM News WHERE Id = @id"
        const pool = await conn
        return pool.request()
            .input('id', sql.BigInt, id)
            .query(sqlString, function (err, response) {
                if (!err) {
                    result(null, { message: "Thành công!", status: 200 })
                }
                else result(true, { message: "Không thành công!" })
            })
    }
}