var express = require('express')
var app = express()
var bodyParser = require(`body-parser`)
var cors = require(`cors`)
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
app.use(router)
//URL루트 설정하기




