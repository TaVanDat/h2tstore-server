const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;
// const sql = require('mssql')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

const product = require('./app/Routers/product.route')
app.use('/api/v1/product', product)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})