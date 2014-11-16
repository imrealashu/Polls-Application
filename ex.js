/*
Author: Ashish Singh & Abhishek Banerjee
Version: 1.0.0
License: GNU V3
*/

var express = require('express')
var bodyParser = require("body-parser");
var app = express()
app.use("/vendor", express.static(__dirname + '/vendor'));
//Make vendor directory static for including static files

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({strict: false}));

var mysql      = require('mysql');
var connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'root',
 password : 'ashish',
 database : 'node_polls'
});
connection.connect();

app.get('/', function (req, res) {
  connection.query('SELECT * FROM question', function(err, rows, fields) {
    if (err) throw err;
    res.render("home.jade",{"rows":rows});    
  });
});

app.get('/question/:qid', function (req, res) {
  var q = req.params.qid;
  var data=[];
  connection.query('SELECT * FROM question WHERE qid ='+q, function(err, rows, fields) {
    if (err) throw err;
    data['question']= rows;
  //setting data in data variable
});
  connection.query('SELECT * FROM answer WHERE qid ='+q, function(err, rows, fields) {
    if (err) throw err;
    data['ans']=rows;
    res.render("question.jade",{"data":data});
  });
});

app.post('/question/result', function (req, res) {
  var aid = req.body.post_answer;
  var q = req.body.qid;
  var data=[];

  var lock = 2;
  connection.query('UPDATE answer set answer.count= answer.count +1 WHERE aid ='+aid, function(err, rows, fields) {
    if (err) throw err;
    connection.query('SELECT * FROM answer WHERE qid='+q, function(err, rows, fields) {
      if (err) throw err;
      data['ans']=rows;
      lock -= 1;
      if(lock ==0){
        res.render("result.jade",{"data":data});
      }

    }); 
    connection.query('SELECT * FROM question WHERE qid ='+q, function(err, rows, fields) {
      if (err) throw err;
      data['question']= rows;
      lock -= 1;
      if(lock ==0){
        res.render("result.jade",{"data":data});  
      }

      console.log(data);
    });
  });
});
//---------------------------------------------//
app.post('/question/add', function (req, res) {
  var question = req.body.new_question;
  res.render('add_question.jade',{'question':question});
});
app.get('/add',function(req, res){
  res.render('add_question.jade',{'question':''});
});
app.post('/question/add_question', function (req, res) {
  console.log('asd: '+req.accepts('application/json'));
  var allData = (req.body);
  console.log(Object.keys(allData).length);
  var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
  connection.query('INSERT INTO question(question,question.date,description) values("'+allData['question']+'","'+date+'","'+allData['description']+'")', function(err, rows, fields) {
    if (err) throw err;
    for(var i=0; i<Object.keys(allData).length -2; i++){
      console.log(allData['option_'+i]);
      connection.query('INSERT INTO answer(qid,answer,answer.count) values("'+rows.insertId+'","'+allData['option_'+i]+'",'+0+')', function(err, rows, fields) {
       if (err) throw err;
     });      
    }
  }); 
  res.send('success');
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})