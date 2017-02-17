var http = require('http');
var fs = require('fs');
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var jsonParser = bodyParser.json();

mongoose.connect('mongodb://testuser:testuser@ds051553.mlab.com:51553/listusers');

var userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  profession: String
});

var User = mongoose.model('User', userSchema);
var urlencodedParser = bodyParser.urlencoded({extended:false});
var data = {
  name:'sagar'
}
var baseResponse =
{
  status:'success',
  message:'Added'
};

app.get('/get-users', function(req,res)
{
  User.find({}, function(err,data){
        if (err)
        {
          res.send("");
        }
        else
        {
            res.send(data);
        }
      });
});

app.post('/submit-user-data', urlencodedParser, function(req,res)
{
  var user = User(req.body).save(function(err,data){
    if(err) throw err;
    res.json(data);
  })
});

app.delete('/delete-user',urlencodedParser, function(req,res)
{
  var id = req.body.// IDEA:
  User.find({user:req.body.user}).remove(function(err, data){
    if(err) throw err;
    res.json(data);
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("listening on 3000");
});
