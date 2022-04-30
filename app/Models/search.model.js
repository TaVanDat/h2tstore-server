const conn = require('../../connect');
const sql = require('mssql');

module.exports = function () {
    let title, sqlQuery, type;
    // get all product search
    this.getSearch = async function (data, result) {
        if (data) {
            sqlQuery = `SELECT * FROM Product where DeletedAt is null Order By ${data.title} ${data.type}`;
        }
        else { sqlQuery = 'SELECT * FROM Product where DeletedAt is null'; }
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