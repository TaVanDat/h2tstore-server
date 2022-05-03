const Cart = require('../Models/cart.model');
const jwt = require('jsonwebtoken')
require('dotenv').config();
var cart = new Cart();


let CustomerId, ProductId, Quantity, SalePrice, Color, Size, TotalQuantity, TotalPrice, dataCart, checkSizeColor = true, checkExist = true;



// get all cart khi hiển thị
exports.getCart = function (req, res) {
    try {
        if (!req.data.Id) return res.status(400).json({ data: { message: "Bad Request" } })
        if (!Number(Number(req.data.Id))) return res.status(404).json({ data: { message: "Not Found" } })
        cart.getAll(req.data.Id, function (err, data) {
            if (err) return res.status(200).json({ data: { message: "SUCCESS", data, TotalQuantity: 0, TotalPrice: 0 }, error: true })
            TotalQuantity = data.length
            TotalPrice = data.reduce((sum, element) => sum + element.SalePrice * element.Quantity, 0);
            return res.send({ data: { message: "SUCCESS", data, TotalQuantity, TotalPrice }, error: false })
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}
// get all cart để làm middleware
exports.getCartMiddleWare = function (req, res, next) {
    try {
        if (!req.data.Id) return res.status(400).json({ data: { message: "Bad Request" } })
        if (!Number(Number(req.data.Id))) return res.status(404).json({ data: { message: "Not Found" } })
        cart.getAll(req.data.Id, function (err, data) {
            // if (err) return res.status(404).json({ data: { message: "Not Found" }, error: true })
            req.cart = data || [];//trả về data kể cả rỗng
            req.TotalQuantity = data.length;
            // console.log(req.cart)
            req.TotalPrice = data.reduce((sum, element) => sum + element.SalePrice * element.Quantity, 0);
            next();
        })
    } catch (error) {
        return res.sendStatus(500);
    }
}
exports.addToCart = function (req, res, next) {
    try {
        // ProductId,CartId,SalePrice,Quantity,Size,Color
        CustomerId = req.data.Id;
        ProductId = req.body.ProductId;
        Quantity = req.body.Quantity;//so luong moi
        SalePrice = req.body.SalePrice;
        Color = req.body.Color;
        Size = req.body.Size;
        TotalPrice = Quantity * SalePrice;// tong gia moi
        if (!Number(ProductId) && !Number(Quantity) && !Number(SalePrice) && !Color && !Size) {
            return res.status(400).json({ data: { message: "Bad Request", data: [] } })
        }
        dataCart = { CustomerId, ProductId, Quantity, SalePrice, Color, Size, TotalQuantity, TotalPrice }
        if (req.TotalQuantity === 0) {//neu chua ton tai userID
            cart.addEmptyCart(dataCart, function (err, response) {
                if (err) return res.status(400).json({ data: { message: "Bad Request", data: [] } })
                next();
            })
        }
        //đã tồn tại user
        else {
            (req.cart).findIndex(item => item.ProductId === dataCart.ProductId & item.Color === dataCart.Color & item.Size === dataCart.Size) !== -1  //neu co san pham trung 
                ?
                (dataCart = {
                    ...dataCart,
                    Quantity: Number(dataCart.Quantity) + Number(req.cart.find(item => Number(item.ProductId) === Number(dataCart.ProductId)).Quantity),
                    checkSizeColor: true,
                    TotalQuantity: Number(req.TotalQuantity) + 1,
                    TotalPrice: Number(dataCart.TotalPrice) + Number(req.TotalPrice)
                })
                :
                (dataCart = {
                    ...dataCart,
                    checkSizeColor: false,
                    TotalQuantity: Number(req.TotalQuantity) + 1,
                    TotalPrice: dataCart.TotalPrice + Number(req.TotalPrice)
                })
            // console.log(
            //     req.cart.find(item => Number(item.ProductId) === Number(dataCart.ProductId))
            // )
            cart.updateCart(dataCart, function (err, response) {
                if (err) return res.status(400).json({ data: { message: "Bad Request", data: [] } })
                next();
            })
        }
    } catch (error) {
        console.log(error)
        return res.sendStatus(500);
    }
}

//delete
exports.deleteCartPro = function (req, res) {
    try {
        CustomerId = req.data.Id;
        ProductId = req.query.productId;
        Color = req.query.color;
        Size = req.query.size;
        if (!Number(ProductId) && !Color && !Size) {
            return res.status(400).json({ data: { message: "Bad Request", data: [] } })
        }
        dataCart = { CustomerId, ProductId, Quantity, SalePrice, Color, Size, TotalQuantity, TotalPrice }
        cart.deleteCart(dataCart, function (err, response) {
            if (err) { return res.status(400).json({ data: { message: "Bad Request!" }, error: err }) }
            return res.send({ data: { message: "SUCCESS!" }, Error: err })
        })
    } catch (error) {

    }
}