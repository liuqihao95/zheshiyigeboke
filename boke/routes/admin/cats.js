var express = require('express');
var router = express.Router();

var cats = require('../../database/model/cats')


router.get('/', function (req, res, next) {
    cats.find({}, function (err, data) {
        console.log(data);
        if (err) {
            res.send(err);
        } else {
            res.render("admin/category_list", {arr: data})
        }
    })
});

router.get('/add', function (req, res) {
    res.render("admin/category_add")
});

router.post('/add', function (req, res, next) {
    cats.create({title: req.body.title, sort: req.body.sort}, function (err, data) {
        console.log(data)
        if (err) {
            res.send(err);
        } else {
            res.send("添加分类成功<a href='http://localhost:3000/admin/cats'>查看分类列表</a>" +
                "<a href='http://localhost:3000/admin/cats/add'>继续提添加分类</a>")
        }
    })
});

router.get('/edit', function (req, res, next) {
    console.log(req.query.id);
    cats.find({_id:req.query.id}, function (err, data) {
        console.log(data);
        if (err) {
            res.send(err);
        } else {
            res.render("admin/category_edit", {lol: data})
        }
    })
});

router.post('/edit', function (req, res, next) {
    cats.update({_id:req.query.id},{title: req.body.title,sort: req.body.sort}, function (err, data) {
        console.log(data);
        if (err) {
            res.send(err);
        } else {
            res.send("修改分类成功<a href='http://localhost:3000/admin/cats'>查看分类列表</a>")
        }
    })
});

router.get('/delete', function (req, res, next) {
    console.log(req.query.id);
    cats.remove({_id:req.query.id}, function (err, data) {
        console.log(data);
        if (err) {
            res.send(err);
        } else {
            res.send("删除分类成功<a href='http://localhost:3000/admin/cats'>查看分类列表</a>")
        }
    })
});

module.exports = router;
