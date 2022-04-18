const conn = require('../../connect');
const sql = require('mssql')

//result is callback function
module.exports = function () {
    this.addNews = async function (newData, result) {
        const sqlString = "INSERT INTO Image (Code,Name,Color) VALUES(@code,@name,@color)";
        const pool = await conn
        return pool.request()
            .input('code', sql.NVarChar, newData.Code)
            .input('name', sql.NVarChar, newData.Name)
            .input('color', sql.NVarChar, newData.Color)
            .query(sqlString, function (err, rec) {
                if (!err) {
                    result(null, rec.recordset)
                }
                else { result(true, { message: "Thêm không thành công!" }) }
            })
    }
    this.update = async function (id, newData, result) {
        const sqlString = "update Image set Code = @code, Name = @name, Color= @color where Id = @id";
        const pool = await conn
        return pool.request()
            .input('id', sql.Int, id)
            .input('code', sql.NVarChar, String(newData.Code))
            .input('name', sql.NVarChar, newData.Name)
            .input('color', sql.NVarChar, newData.Color)
            .query(sqlString, function (err, response) {
                if (!err) {
                    result(null, { message: "Thành công!", status: 200 })
                }
                else result(true, { message: "Không thành công!" })
            })

    }
    this.deleteId = async function (id, result) {
        const sqlString = "delete from Image  where Id = @id";
        const pool = await conn
        return pool.request()
            .input('id', sql.Int, id)
            .query(sqlString, function (err, rec) {
                if (!err) {
                    result(null, { message: "Xóa thành công!" });
                }
                else
                    result(true, { message: "Xóa không thành công!" });
            })
    }
    this.checkImage = async function (newData, result) {
        const sqlString1 = 'Select Email From Image Where Code = @code'
        const pool = await conn
        return pool.request()
            .input('code', sql.NVarChar, newData.Code)
            .query(sqlString1, function (error, rec) {
                if (rec.recordset.length > 0) {
                    result(false, rec.recordset);
                }
                else
                    result(true, { message: 'Product is exist!' });
            })
    }
    this.getImage = async function (result) {
        const sqlString1 = 'Select * From Product where Id = 2 or Id = 3'
        const pool = await conn
        return pool.request()
            // .input('id', sql.BigInt, id)
            .query(sqlString1, function (error, rec) {
                if (rec.recordset.length > 0) {
                    result(false, rec.recordset);
                }
                else
                    result(true, { message: 'Error!' });
            })
    }

}
