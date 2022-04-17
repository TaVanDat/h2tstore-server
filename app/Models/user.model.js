const conn = require('../../connect');
const sql = require('mssql');

module.exports = function () {
    this.getAll = async function (result) {
        const sqlString = 'SELECT * FROM Account';
        const pool = await conn
        return pool.request()
            .query(sqlString, function (error, rec) {
                if (rec.recordset.length > 0) {
                    result(null, rec.recordset);
                }
                else
                    result(true, null);
            })
    }
    this.getUserById = async function (id, result) {
        const sqlString = 'Select * From Account Where Id = @id'
        const pool = await conn
        return pool.request()
            .input('id', sql.BigInt, id)
            .query(sqlString, function (error, rec) {
                if (rec.recordset.length > 0) {
                    result(null, rec.recordset);
                }
                else
                    result(true, null);
            })
    }
    this.update = async function (id, newData, result) {
        const sqlString = "update Account set Name = @name, Gender= @gender, Dob = @dob, Phone= @phone, Address = @address, ImageId= @imageId where Id = @id";
        const pool = await conn
        return pool.request()
            .input('id', sql.BigInt, Number(id))
            .input('name', sql.NVarChar, newData.Name)
            .input('gender', sql.NVarChar, newData.Gender)
            .input('dob', sql.DateTime, newData.Dob)
            .input('phone', sql.NVarChar, newData.Phone)
            .input('address', sql.NVarChar, newData.Address)
            .input('imageId', sql.BigInt, newData.ImageId)
            .query(sqlString, function (err, response) {
                if (!err) {
                    result(null, response.recordset)
                }
                else result(true, { message: "Không thành công!" })
            })
    }
}

