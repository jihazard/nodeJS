var express = require('express')
var app = express()


app.listen(3000,function(){
    console.log("start express server on port 3000")
})

//public 디렉토리를 static으로 전달해줌
app.use(express.static(`public`))

//URL루트 설정하기
app.get('/',function(req,res){
        res.sendFile(__dirname+"/public/main.html")
})

app.get('/main',function(req,res){
    res.sendFile(__dirname+"/public/main.html")
})


