var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dataConfig = require('./database/config')

var index = require('./routes/home/index');
var posts = require('./routes/home/posts');
var admin = require('./routes/admin/admin');
var cats = require('./routes/admin/cats');
var article = require('./routes/admin/article');
var users = require('./routes/admin/users');

var app = express();

var session = require("express-session")
app.use(session({
    secret: 'blog',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))
//引入数据库
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     // we're connected!
//     console.log('数据库连接成功')
// });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/home', express.static(path.join(__dirname, 'public/home')));
app.use('/admin', express.static(path.join(__dirname, 'public/admin')));

app.use('/', index);
app.use('/posts', posts);
app.use('/admin/index', checkLogin);
app.use('/admin/index', admin);
app.use('/admin/cats', checkLogin);
app.use('/admin/cats', cats);
app.use('/admin/article', checkLogin);
app.use('/admin/article', article);
app.use('/admin/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

function checkLogin(req, res, next) {
    // 根据session是否有登录的标志来判断用户是否已经登录了
    if (!req.session.isLogin) {
        res.redirect('/admin/users')
    }
    next();
}

module.exports = app;
