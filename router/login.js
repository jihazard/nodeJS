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
    res.render("login.ejs" ,{"message":msg})
})

 passport.serializeUser(function(user,done){
     console.log( 'passport session save : ' , user.email)
     done(null,user.email)
 })

 passport.deserializeUser(function(email,done){
    console.log( 'passport session deseirlaize : ' , email)
    done(null,email)

 })

 passport.use('local-login' , new LocalStrategy({
     usernameField : 'email',
     passwordField : 'pw',
     passReqToCallback:true 
 }, function(req,email,pw,done){
     console.log('local-login callbakc called' + req)
     console.log(email)
     console.log(pw)

     var query = connection.query(`select * from user where email = ? `, [email] ,function(err,rows){
         if(err) return done(err)
         if(rows.length) {
            console.log('existed user')
            return done(null, {'email' : email , 'id' : rows[0].UID})  //flash 로 가능함
         }else{
                  return done(null,  false, {'message' : 'your login info is not found!!!!'})  //콜백에서 done 처리하려면 passport.serializeUser(function()) 정의해야함
            }
         
     })
 }
 ));

//  router.post("/", passport.authenticate('local-login',{
//     successRedirect : '/',
//     failureRedirect : '/login',
//     failureFlash:true
// }),function(req,res){
//     console.log("---------passport")
// })

//Custom callback
router.post("/",function(req,res,next){
    console.log("-00000000000000" + req.body.name +"//" + req.body.email)
    passport.authenticate('local-login',function(err,user,info){
        if(err)res.status(500).json(err)
        if(!user)return res.status(401).json(info.message);

        req.logIn(user, function(err){
            if(err) {return next(err)}
            return res.json(user);
        })
        
        
    }) (req,res,next);
})


module.exports = router