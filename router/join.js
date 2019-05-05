var express = require('express')
var app = express()
var router = express.Router();

var path = require(`path`);
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

var mysql = require(`mysql`)
var connection = mysql.createConnection({
    host:"localhost",
    port :3306,
    user : "hyb",
    password:"hyb01",
    database:"com"

})

connection.connect()


router.get('/',function(req,res){
    //res.sendFile(path.join(__dirname,"../public/join.html"))
    var msg ; 
    var errMsg = req.flash('error')
    if(errMsg) msg = errMsg
    res.render("join.ejs" ,{"message":msg})
})

 //passport.serialize

 passport.use('local-join' , new LocalStrategy({
     usernameField : 'email',
     passwordField : 'pw',
     passReqToCallback:true 
 }, function(req,email,pw,done){
     console.log('local-join callbakc called' + req)
     console.log(email)
     console.log(pw)

     var query = connection.query(`select * from user where email = ? `, [email] ,function(err,rows){
         if(err) return done(err)
         if(rows.length) {
            console.log('existed user')
            return done(null,false, {message : 'your email is alread used'})  //flash 로 가능함
         }else{
            var sql ={email : email,pw :pw}
            var query = connection.query(`insert into user set ? `,sql,function(err,rows){
                if(err) throw err
                return done(null, {'email':email ,'id': rows.insertId})
            })
         }
     })
 }
 ));

 router.post("/", passport.authenticate('local-join',{
    successRedirect : '/',
    failureRedirect : '/join',
    failureFlash:true
}),function(req,res){
    console.log("---------passport")
})

// router.post('/create',function(req,res){

//     var email = req.body.email;
//     var name = req.body.name;
//     var pw = req.body.pw;
//     console.log(`${name},${email},${pw}`)
//     var responseData= {}
//     /*var query = connection.query(`
//     insert into user (name,email,pw) values(${name},${email},${pw})
//     ` ,function(err,rows){
//     */

//         var sql = {name:name,
//                    email:email,
//                    pw:pw}
//         var query = connection.query(`
//         insert into user set ?` ,sql ,function(err,rows){
   
//     if(err) throw err
//          var data = JSON.stringify(rows)
//          console.log(rows.insertId +"/ insert success ! /" + name )
//          /*if(rows.length >= 1){
//              responseData.result ="ok"
//              responseData.vo=rows
//          }else {
//              responseData.result ="none"
//              responseData.vo="none"
//          }*/

//         res.render("welcome.ejs", {"info":sql , "result":rows})
//      }) 
//  })

module.exports = router