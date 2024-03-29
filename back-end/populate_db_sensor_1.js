var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:3001/";


MongoClient.connect(url, (err, db) => {
    
    var time = Number(Date.now() - 3000000000);
    
    var data_tab = []
    var up = 5;
    var last_humi = 10;
    var last_temp = 20;
    var last_bat = 90;
    for(var i = 0; i < 200000; i++) {
        time += Number(Math.floor((Math.random() * 120000)))
        if(last_temp > 35) {
            last_temp -= Math.random() * 3;
        } else if (last_temp < -10) {
            last_temp += Math.random() *3;
        } else {
            last_temp += (Math.random() * 2) - 1;
        }

        if(last_humi > 99) {
            last_humi -= Math.random() * 10;
        } else if (last_humi < 1) {
            last_humi += Math.random() * 8;
        } else {
            last_humi += (Math.random() * 6) - 3;
        }
        
        last_bat = last_bat - (Math.random() / 500);
        var data = {
            sensor_id : "101010",
            data : {
                temperature : last_temp,
                humidity : last_humi,
                battery : last_bat
            },
            time : time
        }
        data_tab.push(data);
    }
            db.db("weather_station").collection("sensor_data").insert(data_tab, function(err, res) {
                if (err) throw err;
                console.log("ok");
                db.close();
              });
});
    

    
