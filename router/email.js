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


router.get('/index',function(req,res){
    res.sendFile(path.join(__dirname,"../public/form.html"))
})


router.post('/post',function(req,res){
    console.log(req.body.email)
    res.render(`email.ejs`,{'email' : req.body.email})

})
router.post('/ajax',function(req,res){
   var email = req.body.email;
   var responseData= {}
   var query = connection.query(`select * from user where email = '${email}'` ,function(err,rows){
        if(err) throw err

        console.log(rows + rows.length)
        if(rows.length >= 1){
            responseData.result ="ok"
            responseData.vo=rows
        }else {
            responseData.result ="none"
            responseData.vo="none"
        }
        res.json(responseData)
    })
})


module.exports = router