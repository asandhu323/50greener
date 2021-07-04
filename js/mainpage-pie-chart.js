var scores = [];

$(function () {
    getTransportData()
});

function getTransportData() {
    $.ajax({
        url: "/get-breakdown-transport",
        dataType: "json",
        type: "GET",
        success: function (data) {
            scores.push(parseInt(data[0].transportscore));
            getHomeData();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR:", jqXHR, textStatus, errorThrown);
        }
    });
};

function getHomeData() {
    $.ajax({
        url: "/get-breakdown-home",
        dataType: "json",
        type: "GET",
        success: function (data) {
            scores.push(parseInt(data[0].homescore));
            getWaterData();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR:", jqXHR, textStatus, errorThrown);
        }
    });
};

function getWaterData() {
    $.ajax({
        url: "/get-breakdown-water",
        dataType: "json",
        type: "GET",
        success: function (data) {
            scores.push(parseInt(data[0].waterscore));
            getFoodData();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR:", jqXHR, textStatus, errorThrown);
        }
    });
};

function getFoodData() {
    $.ajax({
        url: "/get-breakdown-food",
        dataType: "json",
        type: "GET",
        success: function (data) {
            scores.push(parseInt(data[0].foodscore));
            createChart();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR:", jqXHR, textStatus, errorThrown);
        }
    });
}

function createChart() {
    var ctx = document.getElementById('myChart');
        // ctx.height = 400;
        // ctx.width = 400;
        
        var data = {
            labels: ['Transportation', 'Home', 'Water', 'Diet'],
            datasets: [{
                label: 'Environmental Footprint Breakdown',
                data: scores,
                backgroundColor: [
                    'rgb(60, 115, 41)',
                    'rgb(93, 184, 102)',
                    'rgb(200, 233, 167)',
                    'rgb(215, 46, 46)'
                ],
                hoverOffset: 4,
                borderColor: 'rgb(230, 240, 228)'
            }]
        };
        
        var option = {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 20
                        }
                    }
                }
            }
        };
        
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: option
        });
};
