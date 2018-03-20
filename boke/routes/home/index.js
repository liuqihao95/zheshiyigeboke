var express = require('express');
var router = express.Router();
var article = require('../../database/model/article')

/* GET home page. */
router.get('/', function(req, res, next) {
  article.find({},(err,data)=>{
    if(err){
      console.log(err)
    }else{
        res.render('home/index', { lck: data });
    }
  })
});
module.exports = router;
