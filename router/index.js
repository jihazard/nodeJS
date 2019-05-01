var express = require('express')
var app = express()
var router = express.Router();

var path = require(`path`);
var main = require('./main')
var email = require('./email')




router.use("/",main)
router.use("/email",email)


module.exports=router
