var express = require('express')
var app = express()
var router = express.Router();

var path = require(`path`);
var main = require('./main')
var email = require('./email')
var join = require('./join')


router.use(main)
router.use("/email",email)
router.use("/join",join)


module.exports=router
