var express = require('express');
var router = express.Router();
var article = require('../../database/model/article')
var cats = require('../../database/model/cats')
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/DNF');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.log('数据库连接成功')
// });
//
// const userSchema = new mongoose.Schema({
//     cat:String,
//     title: String,
//     cover:String,
//     summary:String,
//     content:String,
//     time:String,
// });
//
// const article = mongoose.model('article', userSchema, 'article');

router.get('/', function(req, res, next) {
    article.find({},function (err,data) {
        if(err){
            console.log(err);
        }else {
            res.render('admin/article_list',{arr:data});
        }
    });
});
router.get('/add', function(req, res) {
    cats.find({},function (err,data) {
        if(err){
            console.log(err);
        }else {
            console.log(data)
            res.render('admin/article_add',{lol:data});
        }

    })
});
router.post('/add', function(req, res, next) {
    var a=new Date();
    a=a.toLocaleString();
    article.create({cat:req.body.cat,title:req.body.title,cover:req.body.cover,summary:req.body.summary,content:req.body.content,time:a},function (err,data) {
        if(err){
            console.log(err);
        }else {
            res.send("添加分类成功<a href='http://localhost:3000/admin/article'>查看分类列表</a>" +
                "<a href='http://localhost:3000/admin/article/add'>继续提添加分类</a>")
        }
    })
});
router.get('/delete', function(req, res) {
    console.log(req.query.id);
    article.remove({_id:req.query.id}, function (err, data) {
        console.log(data);
        if (err) {
            res.send(err);
        } else {
            res.send("删除分类成功<a href='http://localhost:3000/admin/article'>查看文章列表</a>")
        }
    })
});
module.exports = router;
