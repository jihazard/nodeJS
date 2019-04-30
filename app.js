var express = require('express')
var app = express()


app.listen(3000,function(){
    console.log("start express server on port 3000")
})
//URL루트 설정하기
app.get('/',function(req,res){
 
    res.sendFile(__dirname+"/public/main.html")
})

