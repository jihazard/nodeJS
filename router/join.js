var express = require('express')
var app = express()
var router = express.Router();

var path = require(`path`);

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
    res.render("join.ejs")
})


router.post('/create',function(req,res){

    var email = req.body.email;
    var name = req.body.name;
    var pw = req.body.pw;
    console.log(`${name},${email},${pw}`)
    var responseData= {}
    /*var query = connection.query(`
    insert into user (name,email,pw) values(${name},${email},${pw})
    ` ,function(err,rows){
    */

        var sql = {name:name,
                   email:email,
                   pw:pw}
        var query = connection.query(`
        insert into user set ?` ,sql ,function(err,rows){
   
    if(err) throw err
         var data = JSON.stringify(rows)
         console.log(rows.insertId +"/ insert success ! /" + name )
         /*if(rows.length >= 1){
             responseData.result ="ok"
             responseData.vo=rows
         }else {
             responseData.result ="none"
             responseData.vo="none"
         }*/

        res.render("welcome.ejs", {"info":sql , "result":rows})
     }) 
 })

module.exports = router