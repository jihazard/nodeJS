# 노드 js 

### express 기반 웹 서버 실행하기 
* 노드 express 서버 설치 npm install express --save
* 노드js는 비동기 방식으로 구동된다.
* 종료는 ctrl + c 로 종료한다.
* 자동으로 파일의 변화를 감지하는 방법 npm install nodemon --global

~~~
var express = require('express')
var app = express()

app.listen(3000,function(){
    console.log("start express server on port 3000")
})


~~~


### URL Routing 처리
* URL 루트에 문자열 전송
~~~
//URL루트 설정하기
app.get('/',function(req,res){
    res.send("hi !!!!!! first app")
})
~~~


* URL루트에 HTML파일 연동
   1. public 폴더 생성 후 main.html파일 생성
   2.  res.sendFile()에 __dirname + 루트 + 파일명 으로 연동할 파일 위치 정의

~~~
var express = require('express')
var app = express()


app.listen(3000,function(){
    console.log("start express server on port 3000")
})
//URL루트 설정하기
app.get('/',function(req,res){
        res.sendFile(__dirname+"/public/main.html")
})

~~~

### static 디렉토리 설정
* static 설정하기
 1. public 폴더에 main.js 생성 후 서버를 활성화 한 뒤 localhost:3000/main.js 접속하면 오류가 활성화됨

 2. app.use(express.static(`public`)) 명령어로 public 폴더를 static 으로 지정해줄수있음

 ~~~
 var express = require('express')
var app = express()


app.listen(3000,function(){
    console.log("start express server on port 3000")
})

//public 디렉토리를 static으로 전달해줌
app.use(express.static(`public`))

app.get('/',function(req,res){
        res.sendFile(__dirname+"/public/main.html")
})

 ~~~

 3. 이제 서버 재시 작 후 localhost:3000/main.js 로 직접 접속해도 js및 이미지 파일에 직접접근이 가능함 


