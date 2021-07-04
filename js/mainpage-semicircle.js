var average;
var currentscore;
var results;
var maximum;
var minimum;

$(function () {
    getAverageScore();
});

function getAverageScore() {
    $.ajax({
        url: "/get-Average",
        dataType: "json",
        type: "GET",
        success: function (data) {
            if (data != null) {
                average = data[0].average;
                getMaximumScore();
            } else {
                currentscore = 0;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR:", jqXHR, textStatus, errorThrown);
        }
    });
};

function getMaximumScore() {
    $.ajax({
        url: "/get-Maximum",
        dataType: "json",
        type: "GET",
        success: function (data) {
            if (data != null) {
                maximum = data[0].maximum;
                getMinimumScore();
            } else {
                currentscore = 0;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR:", jqXHR, textStatus, errorThrown);
        }
    });
};

function getMinimumScore() {
    $.ajax({
        url: "/get-Minimum",
        dataType: "json",
        type: "GET",
        success: function (data) {
            if (data != null) {
                minimum = data[0].minimum;
                getCurrentScore();
            } else {
                currentscore = 0;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR:", jqXHR, textStatus, errorThrown);
        }
    });
};

function getCurrentScore() {
    $.ajax({
        url: "/get-current-score",
        dataType: "json",
        type: "GET",
        success: function (data) {
            if (data != null) {
                currentscore = data[0].currentscore;
                $("#carbon-score").html("Carbon Score: " + currentscore);
                calculate();
            } else {
                currentscore = 0;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR:", jqXHR, textStatus, errorThrown);
        }

    });
}

function calculate() {
    var normalized = (currentscore - minimum) / (maximum - minimum);
    
    var normAvg = (average - minimum) / (maximum - minimum);
    
    var score = normalized / normAvg;
    results = score / 2;

    if (results > 1) {
        results = 1;
    }

    createBar();
}
function createBar() {
    var bar = new ProgressBar.SemiCircle('.chartGauge', {
        strokeWidth: 6,
        color: '#FFEA82',
        trailColor: '#5DB866',
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 1400,
        svgStyle: null,
        text: {
            value: '',
            alignToBottom: false
        },
        from: {
            color: '#3C7329'
        },
        to: {
            color: '#D72E2E'
        },
        step: (state, bar) => {
            bar.path.setAttribute('stroke', state.color);
            var value = Math.round(bar.value() * 100);
            if (value === 0) {
                bar.setText('You\'re #1');
            } else {
                if (value < 20) {
                    var word = "Way Below Average";
                } else if (value >= 20 && value < 40) {
                    word = "Below Average";
                } else if (value >= 40 && value < 60) {
                    word = "Average";
                } else if (value >= 60 && value < 80) {
                    word = "Above Average";
                } else if (value >= 80) {
                    word = "Exceedingly High";
                } else {
                    word = "Calculating";
                }
                bar.setText(word);
            }
            bar.text.style.color = state.color;
        }
    });
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '1.5em';
    
    bar.animate(results);
}
