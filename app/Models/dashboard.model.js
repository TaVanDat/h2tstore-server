const conn = require('../../connect');
const sql = require('mssql')

//result is callback function
module.exports = function () {
    // count all product
    this.countAllProduct = async function (result) {
        const sqlString = 'SELECT COUNT(*) AS TotalProduct FROM Product WHERE DeletedAt IS NULL'
        const pool = await conn;
        return pool.request()
            .query(sqlString, function (err, response) {
                if (response.recordset.length > 0) { result(false, response.recordset); }
                else { result(true, null); }
            })
    }
    this.countAllOrder = async function (result) {
        const sqlString = 'SELECT COUNT(*) AS TotalOrder FROM OrderProduct'
        const pool = await conn;
        return pool.request()
            .query(sqlString, function (err, response) {
                if (response.recordset.length > 0) { result(false, response.recordset); }
                else { result(true, null); }
            })
    }
    this.countAllAccount = async function (result) {
        const sqlString = 'SELECT COUNT(*) AS TotalAccount FROM Account'
        const pool = await conn;
        return pool.request()
            .query(sqlString, function (err, response) {
                if (response.recordset.length > 0) { result(false, response.recordset); }
                else { result(true, null); }
            })
    }
    this.countAllRevenues = async function (month, result) {
        const sqlString = 'SELECT Total as TotalRevenues FROM OrderProduct MONTH(OrderDate) = @month'
        const pool = await conn;
        return pool.request()
            .input('month', sql.Int, month ? Number(month) : new Date().getMonth())
            .query(sqlString, function (err, response) {
                if (response.recordset.length > 0) { result(false, response.recordset); }
                else { result(true, null); }
            })
    }

}