var express = require('express');
var router = express.Router();
var users = require('../../database/model/users')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('admin/login');
});

router.post('/signin', function (req, res, next) {
    var username = req.body.username;
    var pwd = req.body.pwd;
    users.findOne({username: username}, (err, data) => {
        console.log(data);
        console.log(333333);
        console.log(data.pwd);
        console.log(pwd);
        if (data.pwd ==pwd) {
            req.session.isLogin = true;
            res.redirect('/admin/index')
        }
        else {
            res.send('<h1>用户名密码错误</h1>')
        }
    })
});

router.get('/logout', function (req, res, next) {
            req.session.isLogin = null;
            res.redirect('/admin/users')
});


module.exports = router;
