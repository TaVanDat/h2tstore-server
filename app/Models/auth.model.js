const conn = require('../../connect');
const sql = require('mssql');
const moment = require('moment');

module.exports = function () {
    this.getEmail = async function (newData, result) {
        const sqlString1 = 'Select Email From Account Where Email = @email'
        const pool = await conn
        return pool.request()
            .input('email', sql.NVarChar, newData.Email)
            .query(sqlString1, function (error, rec) {
                if (rec.recordset.length > 0) {
                    result(false, rec.recordset);
                }
                else
                    result(true, { message: 'Email is exist!' });
            })
    }
    this.regis = async function (newData, result) {
        const sqlString = 'INSERT INTO Account (Name,Gender,Dob,Email,Phone,Address,UserName,Password,StatusId,Image) VALUES(@name,@gender,@dob,@email,@phone,@address,@userName,@password,1,@image)';
        const pool = await conn
        return pool.request()
            .input('name', sql.NVarChar, newData.Name)
            .input('gender', sql.NVarChar, newData.Gender)
            .input('dob', sql.DateTime, moment(newData.Dob, 'DD-MM-YYYY').format('MM-DD-YYYY'))
            .input('email', sql.NVarChar, newData.Email)
            .input('phone', sql.NVarChar, newData.Phone)
            .input('address', sql.NVarChar, newData.Address)
            .input('userName', sql.NVarChar, newData.UserName)
            .input('password', sql.NVarChar, newData.Password)
            .input('image', sql.NVarChar, newData.Image)
            .query(sqlString, function (error, rec) {
                if (!error) {
                    result(null, { message: 'REGISTER_SUCCESS' });
                }
                else
                    result(true, { message: "FAILED", statusCode: 400, status: 'Bad Request' });
            })
    }
    this.signIn = async function (newData, result) {
        const sqlString = 'SELECT Id,Email,UserName,Role,Name FROM Account Where Email = @email and Password = @password';
        const pool = await conn
        return pool.request()
            .input('email', sql.NVarChar, newData.Email)
            .input('password', sql.NVarChar, newData.Password)
            .query(sqlString, function (error, rec) {
                if (rec.recordset.length > 0) {
                    result(null, rec.recordset);
                }
                else
                    result(true, null);
            })
    }
    this.signOut = async function () {

    }
}

