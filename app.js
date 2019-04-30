var express = require('express')
var app = express()
var bodyParser = require(`body-parser`)

app.listen(3000,function(){
    console.log("start express server on port 3000")
})

//public 디렉토리를 static으로 전달해줌
app.use(express.static(`public`))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//URL루트 설정하기
app.get('/',function(req,res){
        res.sendFile(__dirname+"/public/main.html")
})

app.get('/main',function(req,res){
    res.sendFile(__dirname+"/public/main.html")
})

app.get('/email',function(req,res){
    res.sendFile(__dirname+"/public/form.html")
})


app.post('/email_post',function(req,res){

    console.log(req.body.email)
   res.send("post response" )
})



