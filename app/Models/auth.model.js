const conn = require('../../connect');
const sql = require('mssql');

module.exports = function () {
    this.regis = async function (newData, result) {
        const sqlString = 'INSERT INTO Account (Code,Name,Gender,Dob,Email,Phone,Address,UserName,Password,StatusId,ImageId) VALUES(@code,@name,@gender,@dob,@email,@phone,@address,@userName,@password,1,@imageId)';
        const pool = await conn
        return pool.request()
            .input('code', sql.NVarChar, newData.Code)
            .input('name', sql.NVarChar, newData.Name)
            .input('gender', sql.NVarChar, newData.Gender)
            .input('dob', sql.DateTime, newData.Dob)
            .input('email', sql.NVarChar, newData.Email)
            .input('phone', sql.NVarChar, newData.Phone)
            .input('address', sql.NVarChar, newData.Address)
            .input('userName', sql.NVarChar, newData.UserName)
            .input('password', sql.NVarChar, newData.Password)
            .input('imageId', sql.BigInt, newData.ImageId)
            .query(sqlString, function (error, rec) {
                if (!error) {
                    result(null, { message: 'REGISTER_SUCCESS' });
                }
                else
                    result(true, { message: 'REGISTER_FAIL' });
            })
    }
    this.postUser = async function (newData, result) {
        const sqlString = 'SELECT Email,Password FROM Account Where Email = @email';
        const pool = await conn
        return pool.request()
            .input('email', sql.NVarChar, newData.Email)
            .query(sqlString, function (error, rec) {
                if (rec.recordset.length > 0) {
                    result(null, rec.recordset);
                }
                else
                    result(true, null);
            })
    }
}

