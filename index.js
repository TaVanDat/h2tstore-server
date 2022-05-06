const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const compression = require('compression');
const app = express();
app.use(compression({ level: 6, threshold: 100000 }));
const PORT = process.env.PORT || 5000;

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
const users = require('./app/Routers/user.route')
const image = require('./app/Routers/Image.route')
const category = require('./app/Routers/category.route')
const cartUser = require('./app/Routers/cart.route')
const news = require('./app/Routers/news.route')
const searchP = require('./app/Routers/search.route')
const dashboardAdmin = require('./app/Routers/dashboard.route')



app.use('/api/v1/authentication', userAuth);
app.use('/api/v1/product', product);
app.use('/api/v1/users', users);
app.use('/api/v1/image', image);
app.use('/api/v1/category', category);
app.use('/api/v1/cart', cartUser);
app.use('/api/v1/news', news);
app.use('/api/v1/search', searchP);
app.use('/api/v1/dashboard', dashboardAdmin)


function authenToken(req, res, next) {
    //'Bearer [token]'
    try {
        const token = req.headers?.authorization?.split(' ')[1]
        if (!token) { return res.status(401).json({ message: 'Unauthorized', statusCode: 401 }); }
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
            if (err) res.status(403).json({ message: 'Forbidden', statusCode: 403 })
            else {
                // console.log(data.Id);
                req.data = data.Id
                next();
            }
        })
    } catch (error) {
        return res.status(403).send({ err: [{ error }] })
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})