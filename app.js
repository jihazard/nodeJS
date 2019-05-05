var express = require('express')
var app = express()
var bodyParser = require(`body-parser`)
var cors = require(`cors`)
var passport = require('passport')
var LocalStrategy  = require('passport-local').Strategy;
var session = require('express-session')
var flash = require('connect-flash')
var router = require("./router/index")

app.listen(3000,function(){
    console.log("start express server on port 3000")
})

//public 디렉토리를 static으로 전달해줌
app.use(express.static(`public`))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set(`view engine`, `ejs`)
app.use(cors())

app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(router)
//URL루트 설정하기




