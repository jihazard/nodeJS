var express = require('express')
var app = express()
var router = express.Router();

var path = require(`path`);
var main = require('./main')
var email = require('./email')
var join = require('./join')

var login = require('./login')
var logout = require('./logout')

router.use(main)
router.use("/email",email)
router.use("/join",join)
router.use("/login",login)
router.use("/logout",logout)

router.get("/",function(req,res){
    res.render("join.ejs")
})

module.exports=router
