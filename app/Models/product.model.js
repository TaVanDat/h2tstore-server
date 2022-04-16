const conn = require('../../connect');
const sql = require('mssql')

//result is callback function
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
    this.getDetail = async function (id, result) {
        const sqlString = 'SELECT * FROM Image where Id = @id';
        const pool = await conn
        return pool.request()
            .input('id', sql.Int, id)
            .query(sqlString, function (err, rec) {
                if (rec.recordset.length > 0) {
                    result(null, rec.recordset);
                }
                else
                    result(true, null);
            })
    }
    this.addNews = async function (newData, result) {
        const sqlString = "INSERT INTO Image (Code,Name,Color) VALUES(@code,@name,@color)";
        const pool = await conn
        return pool.request()
            .input('code', sql.NVarChar, newData.Code)
            .input('name', sql.NVarChar, newData.Name)
            .input('color', sql.NVarChar, newData.Color)
            .query(sqlString, function (err, rec) {
                if (!err) {
                    result(null, { message: "Thêm thành công!" })
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
}
