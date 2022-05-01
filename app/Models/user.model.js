const conn = require('../../connect');
const sql = require('mssql');
const moment = require('moment');

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
        const sqlString = "update Account set Name = @name, Gender= @gender, Dob = @dob, Phone= @phone, Address = @address, Image= @image where Id = @id";
        const pool = await conn
        return pool.request()
            .input('id', sql.BigInt, Number(id))
            .input('name', sql.NVarChar, newData.Name)
            .input('gender', sql.NVarChar, newData.Gender)
            .input('dob', sql.DateTime, moment(newData.Dob, 'DD-MM-YYYY').format('MM-DD-YYYY'))
            .input('phone', sql.NVarChar, newData.Phone)
            .input('address', sql.NVarChar, newData.Address)
            .input('image', sql.NVarChar, newData.Image)
            .query(sqlString, function (err, response) {
                if (!err) {
                    result(false, newData)
                }
                else result(true, { message: "Không thành công!" })
            })
    }

    // recover password
    this.checkEmail = async function (email, result) {
        const sqlString = "Select Email From Account where Email = @email";
        const pool = await conn
        return pool.request()
            .input('email', sql.NVarChar, email)
            .query(sqlString, function (err, response) {
                if (!err) {
                    result(true, {})
                }
                else result(false, {})
            })
    }
    this.recover = async function (newData, result) {
        const sqlString = "update Account set Password = @password where Email = @email";
        const pool = await conn
        return pool.request()
            .input('email', sql.NVarChar, newData.Email)
            .input('password', sql.NVarChar, newData.Password)
            .query(sqlString, function (err, response) {
                if (!err) {
                    result(false, { message: "Đổi thành công!" })
                }
                else result(true, { message: "Không thành công!" })
            })
    }
}

