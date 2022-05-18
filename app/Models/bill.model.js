const conn = require('../../connect');
const sql = require('mssql')

module.exports = function () {
    this.getOrder = async function (result) {
        const sqlString = 'SELECT od.Id, od.Code, od.Total, od.StatusId, od.TransformMethod, ac.Name as Account FROM OrderProduct od JOIN Account ac ON ac.Id = od.AccountId'
        const pool = await conn;
        return pool.request()
            .query(sqlString, function (err, response) {
                if (response?.recordset.length > 0) { result(false, response.recordset); }
                else { result(true, null); }
            })
    }
    this.getOrderDetail = async function (id, result) {
        const sqlString = 'select p.Name,od.Price,od.Quantity,od.Amount from OrderProductContent od join Product p on od.ProductId = p.Id where OrderProductId =@id'
        const pool = await conn;
        return pool.request()
            .input('id', sql.BigInt, Number(id))
            .query(sqlString, function (err, response) {
                if (response.recordset.length > 0) { result(false, response.recordset); }
                else { result(true, null); }
            })
    }
    this.updateStatus = async function (data, result) {
        const sqlString = 'update OrderProduct set StatusId = @StatusId where Id = @Id '
        const pool = await conn;
        return pool.request()
            .input('Id', sql.BigInt, data.Id)
            .input('StatusId', sql.BigInt, data.StatusId)
            .query(sqlString, function (err, response) {
                if (!err) {
                    result(false, {})
                }
                else result(true, {})
            })
    }
}