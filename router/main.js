var express = require('express')
var app = express()
var router = express.Router();

var path = require(`path`);


router.get('/',function(req,res){
    console.log("모듈화 페이지접속")
    res.sendFile(path.join(__dirname,"../public/main.html"))
})

module.exports = router
