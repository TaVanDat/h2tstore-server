const conn = require('../../connect');
const sql = require('mssql')

module.exports = function () {
    this.getOrder = async function (result) {
        const sqlString = 'SELECT od.Id,od.Code,od.Total,od.TransformMethod,ac.Name as Account ' +
            'FROM OrderProduct od JOIN Account ac ON ac.Id = od.AccountId'
        const pool = await conn;
        return pool.request()
            .query(sqlString, function (err, response) {
                if (response.recordset.length > 0) { result(false, response.recordset); }
                else { result(true, null); }
            })
    }
}