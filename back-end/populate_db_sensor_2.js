var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:3001/";


MongoClient.connect(url, (err, db) => {
    
    var time = Number(Date.now() - 3000000000);
    
    var data_tab = []
    var up = 5;
    var last_CO2 = 10;
    var last_brightness = 20;
    var last_bat = 90;
    for(var i = 0; i < 200000; i++) {
        time += Number(Math.floor((Math.random() * 120000)))
        if(last_CO2 > 35000) {
            last_CO2 -= Math.random() * 30;
        } else if (last_CO2 < 40) {
            last_CO2 += Math.random() *30;
        } else {
            last_CO2 += (Math.random() * 10) - 4;
        }

        if(last_brightness > 99) {
            last_brightness -= Math.random() * 10;
        } else if (last_brightness < 1) {
            last_brightness += Math.random() * 8;
        } else {
            last_brightness += (Math.random() * 6) - 3;
        }
        
        last_bat = last_bat - (Math.random() / 500);
        var data = {
            sensor_id : "202020",
            data : {
                CO2 : last_CO2,
                brightness : last_brightness,
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
    

    
