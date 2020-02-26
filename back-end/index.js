var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:3001/";

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// on the request to root (localhost:3000/)
app.get('/sensor/:sensor_id', function (req, res) {

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;

        db.db("weather_station").collection("sensor").find(req.params).toArray( (err, result) => {
          if (err) throw err;
          console.log("request sensor : " + result);
          db.close();
          res.send(result);
        });
    });
});

// on the request to root (localhost:3000/)
app.get('/sensor', function (req, res) {

  MongoClient.connect(url, (err, db) => {
      if (err) throw err;

      db.db("weather_station").collection("sensor").find().toArray( (err, result) => {
        if (err) throw err;
        console.log("request sensor : " + result);
        db.close();
        res.send(result);
      });
  });
});

app.get('/sensor_data/:sensor_id/', function (req, res) {

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        db.db("weather_station").collection("sensor_data").find(req.params).toArray( (err, result) => {
          if (err) throw err;
          console.log("request sensor data : " + result);
          db.close();
          res.send(result);
        });
    });
});

app.get('/sensor_data/:sensor_id/:from/:to', function (req, res) {
  console.log(req);
  MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      db.db("weather_station").collection("sensor_data").find({"sensor_id" : req.params.sensor_id, "time" : {$lt : Number(req.params.to), $gt : Number(req.params.from)}}).toArray( (err, result) => {
        if (err) throw err;
        console.log("request sensor data : " + result);
        db.close();

        var selected_result = [];
        var div = Math.floor(result.length / 100);
        if(div > 1) {
          for(var i = 0; i < 99; i++) {
            selected_result.push(result[i*div]);
          }
        result = selected_result;
        }

        result.sort((a, b) => {
          return a.time - b.time;
        })

        res.send(result);
      });
  });
});

app.post('/sensor', function (req, res) {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.db("weather_station").collection("sensor").insertOne(req.body, function(err, res) {
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
        db.db("weather_station").collection("sensor_data").insertOne(req.body, function(err, res) {
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