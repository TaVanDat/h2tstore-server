const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();

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

const userAuth = require('./app/Routers/auth.route')
const product = require('./app/Routers/product.route')
app.use('/api/v1/user', userAuth);
app.use('/api/v1/product', product)
// function authenToken(req, res, next) {
//     //'Bearer [token]'
//     const token = req.headers?.authorization?.split(' ')[1]
//     if (!token) res.sendStatus(401);
//     jwt.verify(token, process.env.ACCESS_TOKEN, (err, res) => {
//         next();
//     })
// }

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})