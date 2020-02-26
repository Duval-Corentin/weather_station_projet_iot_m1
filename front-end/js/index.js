
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

var template  = Handlebars.compile("{{#each sensor}}<div id=\"sensor_div\"><h4>{{this.station_name}}</h4><p>station id : <bold>{{this.sensor_id}}</bold></p><div class=\"ui blue vertical fluid menu\">{{#each this.data_type}}<a class=\"item\"><div class=\"ui  small label\"> <p>{{this}}</p></div>{{@key}}</a>{{/each}}</div><div class=\"ui divider\"></div></div>{{/each}}");

var delta_time = 18144000000;
$("#time_form>div").click(function() {
    $("#time_form").find("input").prop("checked", false);
    $( $(this).children()[0].firstElementChild).prop("checked", true);
    delta_time = Number($($(this).children()[0].firstElementChild).attr("delta_time"));
});

$.getJSON(
    "http://localhost:3000/sensor",
    function(data) {
       $("#menu_div").html(template({sensor : data}));

        $("a.item").click(function(){
            var sensor_id = $(this).parent().parent().children()[1].lastChild.innerText;
            var data_type = $(this)[0].lastChild.textContent;
            $("#menu_div").find('a').removeClass("active");
            $("#menu_div").find(".label").removeClass("teal");
            $(this).addClass("active");
            $(this).find("div").addClass("teal");
            console.log("http://localhost:3000/sensor_data/" + sensor_id + "/" + (Date.now() - delta_time) + "/" + Date.now() + "/");
            $.getJSON(
                
                "http://localhost:3000/sensor_data/" + sensor_id + "/" + (Date.now() - delta_time) + "/" + Date.now() + "/",
                function(sensor_data) {
                    var graph_data = [];
                    var labels = [];
                    var plot_data = []
                    for(const data of sensor_data) {
                        labels.push(data.time);
                        graph_data.push(data.data[data_type]);
                        plot_data.push({x: data.time, y: data.data[data_type]})
                    }
                    
                    $("#chart_div").innerHTML = '&nbsp;';

                    $("#chart_div").append("<canvas id=\"myChart\" width=\"500\" height=\"200\"></canvas>")
                    var ctx = document.getElementById('myChart').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels : labels,
                            datasets : [{
                                label : data_type,
                                data : graph_data,
                                borderColor : "#2e86c1",
                                fill : false,
                                cubicInterpolationMode: 'monotone'
                            }]
                        },
                        options: {
                            scales: {
                                xAxes: [{
                                    type: 'time',
                                    displayFormats: {
                                        quarter: 'MMM YYYY'
                                    }
                                }]
                            },
                            
                        }
                    });
                }

            )
        });

    }
);



