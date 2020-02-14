var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";

app.use(express.json());

// on the request to root (localhost:3000/)
app.get('/sensor/:sensor_id', function (req, res) {

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;

        db.db("samsisen").collection("sensor").find(req.params).toArray( (err, result) => {
          if (err) throw err;
          console.log(result);
          db.close();
          res.send(result);
        });
    });
});

app.get('/sensor_data/:sensor_id', function (req, res) {

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        console.log(req.params);
        db.db("samsisen").collection("sensor_data").find(req.params).toArray( (err, result) => {
          if (err) throw err;
          console.log(result);
          db.close();
          res.send(result);
        });
    });
});

app.post('/sensor', function (req, res) {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.db("samsisen").collection("sensor").insertOne(req.body, function(err, res) {
          if (err) throw err;
          console.log(req.body);
          db.close();
        });
      });
    res.send("data received");
});

app.post('/sensor_data', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        req.body.time = Math.floor(Date.now() / 1000);
        db.db("samsisen").collection("sensor_data").insertOne(req.body, function(err, res) {
          if (err) throw err;
          console.log(req.body);
          db.close();
        });
      });
    res.send("data received");
});



// Change the 404 message modifing the middleware
app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});


// start the server in the port 3000 !
app.listen(3000, function () {
    console.log('Example app listening on port 3000.');
});