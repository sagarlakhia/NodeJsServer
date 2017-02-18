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
  User.find({email:req.body.email}.toArray(function(err, documents){
      if(err) throw err;
      if(documents.size == 0)
      {
        var user = User(req.body).save(function(err,data){
          if(err) throw err;
          //res.json(data);
          res.json(baseSuccessResponse);
        });
      }
      else{
        res.json(baseFailResponse)
      }
  });
});

app.get('/delete-user/:email', function(req,res)
{
  console.log(req.params.email);
  User.find({email:req.params.email}).remove(function(err, data){
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

//app.listen('3000');
 app.listen(process.env.PORT || 3000, function(){
   console.log("listening on 3000");
});
