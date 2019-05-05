# 노드 js 

### 1. nodejs  설정
### express 기반 웹 서버 실행하기 
* 노드 express 서버 설치 npm install express --save
* 노드js는 비동기 방식으로 구동된다.
* 종료는 ctrl + c 로 종료한다.
* 자동으로 파일의 변화를 감지하는 방법 npm install nodemon --global

~~~ javascript
var express = require('express')
var app = express()

app.listen(3000,function(){
    console.log("start express server on port 3000")
})


~~~


### URL Routing 처리
* URL 루트에 문자열 전송
~~~ javascript
//URL루트 설정하기
app.get('/',function(req,res){
    res.send("hi !!!!!! first app")
})
~~~


* URL루트에 HTML파일 연동
   1. public 폴더 생성 후 main.html파일 생성
   2.  res.sendFile()에 __dirname + 루트 + 파일명 으로 연동할 파일 위치 정의

~~~ javascript
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

 ~~~ javascript
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
~~~ javascript
app.post('/email_post',function(req,res){
    console.log(req.body.email)
   res.send("post response" )
})
~~~

4. 정상적으로 값이 주고 받는 것을 확인 할 수있다 다만 body-parser 를 설치하여 쉽게 파라미터를 추출할 수 있다.

5. body-parser 설치 및 적용 방법
   1. npm install body-parser --save
   2. app.js 파일에 설정파일 추가.
     ~~~ javascript
     var bodyParser = require(`body-parser`) //모듈 정의

     app.use(bodyParser.json())
     app.use(bodyParser.urlencoded({extended:true}))
     ~~~

     3. 적용방법
     ~~~ javascript
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
    ~~~ javascript
    app.set(`view engine`, `ejs`) //view enging  ejs 선언

    app.post('/email_post',function(req,res){
     res.render(`email.ejs`,{'email' : req.body.email}) 
     //사용할 파일은 email.ejs 전송할오브젝트는 email : req.body.email

    })
    ~~~
       
 ### ajax 처리하기
 * 요청하기 fetch
 ~~~ javascript
         document.querySelector(".ajaxsend").addEventListener("click",function(){
            const input =document.querySelector("input");
            const val = input.value;
            let data = {"email":val}
            data = JSON.stringify(data)

            fetch("http://127.0.0.1:3000/ajax_send_email",{
                method :"POST",
                headers: {"Content-Type": "application/json"},
                body : data
            }).then(res => res.json())
            .then(function(data){
                console.log(data)
                document.querySelector(".result").innerText=data.email
            })

 ~~~

 * 처리하기 

 ~~~ javascript
 app.post('/ajax_send_email',function(req,res){
    console.log(req.body.email)
    var responseData = {"result" : "ok","email":req.body.email}
    res.json(responseData)
    
})
 ~~~


# node JS 에서 CROS 추가하기 
* http://guswnsxodlf.github.io/enable-CORS-on-express 참조

  * cros 해결을 위한 cors 설치 및 세팅
        1. 설치 npm install cors --save
        2. 세팅
       ~~~javascript 
        var cors = require('cors');
         //CORS 설정
        app.use(cors());
        
CORS란 Cross Origin Resource Sharing의 약자로, 현재 도메인과 다른 도메인으로 리소스가 요청될 경우를 말한다. 예를 들어, 도메인 http://A.com 에서 읽어온 HTML페이지에서 다른 도메인 http://B.com/image.jpg를 요청하는 경우를 말한다. 이런 경우에 해당 리소스는 cross-origin HTTP 요청에 의해 요청된다. 보안 상의 이유로, 브라우저는 CORS를 제한하고 있다.

하지만 SPA(Single Page Application)의 경우에는, RESTful API를 기반으로 비동기 네트워크 통신을 하기 때문에 API 서버와 웹 페이지 서버가 다를 수 있다. 이런 경우에 API 서버로 요청을 할 시에 CORS 제한이 걸리게 된다.

Access-Control-Allow-Origin
이를 해결하기 위해서 가장 간단한 방법은, 서버(API 서버)의 응답 헤더를 변경해주는 것이다. 서버의 헤더 중에는 Access-Control-Allow-Origin라는 프로퍼티가 있는데, CORS를 허용해 줄 도메인을 입력하는 곳이다. 모든 곳에서 CORS를 허용하기 위해서는 모두를 의미하는 *를 입력하면 된다.


    

    

 # mysql 연동하기
  * mysql 설치  
        1.  npm install mysql --save
  * mysql 세팅 및 테이블 접근 방법
       
       ~~~javascript
            var mysql = require(`mysql`)
            var connection = mysql.createConnection({
                host:"localhost",
                port :3306,
                user : "hyb",
                password:"hyb01",
                database:"com"
         })
            connection.connect()
       ~~~

 * mysql에 쿼리 날리고 값 받아오기
    1. 사전준비 
        테이블  : user
        칼럼 : name,email,pw   

    2. 쿼리  db로 날리고 object에 담기
    ~~~javascript
    app.post('/ajax_send_email',function(req,res){
   var email = req.body.email;
   var responseData= {}
   var query = connection.query(`select * from user where email = '${email}'` ,function(err,rows){
        if(err) throw err
        if(rows[0]){
            responseData.result ="ok"
            responseData.vo=rows[0]
        }else {
            responseData.result ="none"
            responseData.vo="none"
        }
        res.json(responseData)
         })
    })
    ~~~

    3. list형태로 받아오기
    ~~~javascript
        app.post('/ajax_send_email',function(req,res){
        var email = req.body.email;
        var responseData= {}
        var query = connection.query(`select * from user` ,function(err,rows){
                if(err) throw err
                if(rows){
                    responseData.result ="ok"
                    responseData.vo=rows
                }else {
                    responseData.result ="none"
                    responseData.vo="none"
                }
                res.json(responseData)
            })
        })
    ~~~

# router 모듈화
  * 세팅하고 설정하기 
    1. 세팅 하기
        * router 폴더 생성 후 /main 라우터를 처리할 main.js 파일 생성
        ~~~javascript

                var express = require('express')
                var app = express()
                var router = express.Router();  //라우터 설정

                var path = require(`path`);  //경로 설정을 위한 패스 호출


                router.get('/',function(req,res){ //app이 아닌 router로 
                    console.log("모듈화 페이지접속")
                    //path.join을 이용해 쉽게 결과 페이지 전달
                    res.sendFile(path.join(__dirname,"../public/main.html"))
                })

                //외부에서 main.js 를 이용할 수 있도록 module.export = router 선언
                module.exports = router

        ~~~

        * app.js에서 위에서 설정한 main.js 사용하기
        ~~~javascript
        //라우터 파일을 main 변수에 선언  .
        var main = require('./router/main')

        // /main router 를 이용할 경우 main 에 정의된  main.js를 이용하겠다고 선언
        app.use("/main",main)

        //   app.js 에서 /main url 을 처리하던 부분 삭제 
       /* app.get('/main',function(req,res){
            console.log("모듈화 페이지접속")
            res.sendFile(path.join(__dirname,"../public/main.html"))
        })*/

        ~~~


# 세션 처리를 위환 PASSPORT 사용환경 설정

  * 모듈설치하기
        1. npm install passport passport-local express-session connect-flash --save-dev
        2. 설치한 모듈 require 시키기
        
        
            var passport = require('passport')
            var LocalStrategy = require('passport-local').Strategy;
            var session = require('express-session')
            var flash = require('connect-flash')
        
 * 미들웨어 , strategy 설정
    ~~~node 
     app.use(passport.initialize())
     app.use(passport.session())
     app.use(flash())

    ~~~

* 패스 포트 세팅 
~~~node

 passport.use('local-join' , new LocalStrategy({
     usernameField : 'email',
     passwordField : 'pw',
     passReqToCallback:true 
 }, function(req,email,pw){
     console.log('local-join callbakc called')
 }
 ));

~~~