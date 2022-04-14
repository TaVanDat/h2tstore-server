const sql = require('mssql')

const config = {
    "user": 'sa',
  "password": '12345',
  "server": 'localhost',
  "database": 'H2TShopDB',
  "port":1433,
  options: {
    encrypt: false
    },
};
const conn = sql.connect(config)
module.exports = conn
// }
// sql.connect(config).then((pool)=>{
//     return pool.request()
// })
// module.exports = {
//     conn: conn,
//     sql:sql,
// }