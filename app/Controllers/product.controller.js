const sql = require('mssql');
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
const conn = require('../../connect');
const Product = require('../Models/product.model');
var product = new Product();

exports.getList = function(req,res){
    product.getAll(function(err,data){
            res.send({data:data,error:err})
    })
}
exports.getById = function(req,res){
    product.getDetail(req.params.id, function (err, data) {
        res.send({data:data,error:err})
    })
}
exports.addNew = function(req,res){
    product.addNews(req.body,function(err,data){
        res.send({data:data,error:err})
    })
}
exports.update = function(req,res){
    product.update(req.params.id,req.body,function(err,data){
        res.send({data:data,error:err})
    })
}
exports.deleteImg = function(req,res){
    product.deleteId(req.params.id,function(err,data){
        res.send({data:data,error:err})
    })
}