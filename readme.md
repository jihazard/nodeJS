# 노드 js 

### 1. nodejs  설정
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



### 2. Request, Response 처리 
### POST 요청 처리 

* 기본적으로 get 처리와 동일하다  app.get 을 app.post로 만 바꿔주면 됨
 1. email 을 입력받고 처리 할수있는 form을 생성 후 처리할 수 있는 post 요청을 생성해보자.

 2. form 생성 
 ~~~
   <form action="/email_post" method="post">
        email : <input type="text" name="email">
        <input type="submit">
    </form>
 ~~~

 3. post 생성
~~~
app.post('/email_post',function(req,res){
    console.log(req.body.email)
   res.send("post response" )
})
~~~

4. 정상적으로 값이 주고 받는 것을 확인 할 수있다 다만 body-parser 를 설치하여 쉽게 파라미터를 추출할 수 있다.

5. body-parser 설치 및 적용 방법
   1. npm install body-parser --save
   2. app.js 파일에 설정파일 추가.
     ~~~
     var bodyParser = require(`body-parser`) //모듈 정의

     app.use(bodyParser.json())
     app.use(bodyParser.urlencoded({extended:true}))
     ~~~

     3. 적용방법
     ~~~
     app.post('/email_post',function(req,res){
        console.log(req.body.email) // 입력 시 받은 eamil주소 출력
        res.send("post response" )
     )}
     ~~~


### View engine
 * 뷰엔진을 이용한 응답 처리 
 * 뷰엔진 ejs 설치 및 세팅
    1. 설치 : npm install ejs --save
    2. 세팅 
        - 1 최상위에 views 폴더를 생성 하고 email.ejs파일을 생성한다.
        - 2 app.js 세팅 후 서버 실행 
    ~~~
    app.set(`view engine`, `ejs`) //view enging  ejs 선언

    app.post('/email_post',function(req,res){
     res.render(`email.ejs`,{'email' : req.body.email}) 
     //사용할 파일은 email.ejs 전송할오브젝트는 email : req.body.email

    })
    ~~~
       
    