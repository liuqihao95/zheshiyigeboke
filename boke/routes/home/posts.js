var express = require('express');
var router = express.Router();
var article = require('../../database/model/article')

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.query.id);
    article.find({_id:req.query.id}, function (err, data) {
        console.log(data);
        if (err) {
            res.send(err);
        } else {
            res.render('home/article',{data:data});
        }
    })
});
module.exports = router;
