//SELECT TOP (4) * FROM News WHERE DeletedAt IS NULl ORDER BY CreatedAt DESC
const conn = require('../../connect');
const sql = require('mssql')

//result is callback function
module.exports = function () {
    let sqlQuery;
    this.getAll = async function (result) {
        sqlQuery = 'SELECT * FROM News WHERE DeletedAt IS NULl';
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
}