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

var baseSuccessResponse =
{
  status:'success',
  message:'Successful'
};

var baseFailResponse =
{
  status:'fail',
  message:'UnSuccessful'
};

app.get('/get-users', function(req,res)
{
  User.find({}, function(err,data){
        if (err)
        {
          res.json("");
        }
        else
        {
            res.json(data);
        }
      });
});

app.post('/submit-user-data', urlencodedParser, function(req,res)
{
  User.find({email:req.body.email}, function(err, cursor){
      if(err) throw err;

      if(cursor.length == 0)
      {
        var user = User(req.body).save(function(err,data){
          if(err)
          {
          res.json(baseFailResponse);
          }
          res.json(baseSuccessResponse);
        });
      }
      else
      {
        res.json(baseFailResponse)
      }
  });
});

app.get('/delete-user/:email', function(req,res)
{
  console.log(req.params.email);
  User.find({email:req.params.email}).remove(function(err, data)
  {
    if(err)
    {
      res.send(baseFailResponse);
    }
    else
    {
      res.send(baseSuccessResponse);
    }
  });
});

app.post('/update-user-data',urlencodedParser, function(req,res)
{
  var update = {
    $set: {name:req.body.name,
            age:req.body.age,
            profession:req.body.profession}
  }

  var query = {
    email : req.body.email;
  }

  User.update(query, update, function(err, count,result){
    if(err) throw err;
    if(count > 0)
    {
      res.json(baseSuccessResponse);
    }
    else
    {
      res.json(baseSuccessResponse);
    }
  });

 app.listen(process.env.PORT || 3000, function(){
   console.log("listening on 3000");
});
