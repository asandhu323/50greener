"use strict";
var slider1 = document.getElementById("myRange1");
var output1 = document.getElementById("value1");
output1.innerHTML = slider1.value + "%";
var x = slider1.value;
x -= x * 0.01;
var color = "linear-gradient(90deg, red " + x + "%, rgb(200, 233, 167) " + x + "%)";
slider1.style.background = color;
slider1.oninput = function() {
    output1.innerHTML = this.value + "%";
}
slider1.addEventListener("input", function(){
    var x = slider1.value;
    x -= x * 0.01;
    var color = "linear-gradient(90deg, red " + x + "%, rgb(200, 233, 167) " + x + "%)";
    slider1.style.background = color;
})

$(function () {

    $("#set-goal").on("click", function () {

      newGoal();
      $("#finish").css("display", "block");

    });

    $("#finish").on("click", function () {

      goMain();

  });

});

var oldScore = 0;
function newGoal() {
    var calculateMultiplier = (100 - slider1.value) * 0.01;

    getOldScore();

    var goal = oldScore * calculateMultiplier;

    $("#goal-value").html(goal);

    $.ajax({
      url: "/update-goal",
      dataType: "json",
      type: "POST",
      data: {userGoal: goal},
      success: function (data) {
          console.log(data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
          console.log("ERROR:", jqXHR, textStatus, errorThrown);
      }

  });
}

function goMain() {
    $.ajax({
        url: "/mainpage",
        dataType: "html",
        type: "GET",
        data: { format: "mainpage" },
        success: function (data) {
          document.documentElement.innerHTML = data;
          
          if (document.getElementById("mainpage-identifier") != null) {
            changePage();
          } else {
            console.log("redirect");
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          $("#content").text(jqXHR.statusText);
          console.log("ERROR:", jqXHR, textStatus, errorThrown);
        }
      });
}

function changePage() {
  var script1 = document.createElement('script');
  script1.id = "jquery-script";
  script1.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
  script1.type = "text/javascript";
  script1.onload = function() {
    var script2 = document.createElement('script');
    script2.id = "client-script";
    script2.src = "../js/client.js";
    script2.type = "text/javascript";
      script2.onload = function() {
        var script3 = document.createElement('script');
        script3.id = "cloudflare-script";
        script3.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.2.0/chart.min.js";
        script3.type = "text/javascript";
        script3.onload = function() {
          var script4 = document.createElement('script');
          script4.id = "progressbar-script";
          script4.src = "https://cdnjs.cloudflare.com/ajax/libs/progressbar.js/1.1.0/progressbar.min.js";
          script4.type = "text/javascript";
          script4.onload = function() {
            var script5 = document.createElement('script');
            script5.id = "piechart-script";
            script5.src = "../js/mainpage-pie-chart.js";
            script5.type = "text/javascript";
            script5.onload = function() {
              var script6 = document.createElement('script');
              script6.id = "semicircle-script";
              script6.src = "../js/mainpage-semicircle.js";
              script6.type = "text/javascript";
              document.getElementById('semicircle-script').replaceWith(script6);
            }
            document.getElementById('piechart-script').replaceWith(script5);
          }
          document.getElementById('progressbar-script').replaceWith(script4);
        }
        document.getElementById('cloudflare-script').replaceWith(script3);
      }
      document.getElementById('client-script').replaceWith(script2);
  }
  document.getElementById('jquery-script').replaceWith(script1);
  var temp7 = '<script id="tweet-script" async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';
  $("#tweet-script").replaceWith(temp7);

}

$(function() {
  getOldScore();
});


function setScore() {
  $("#old-score").html("Carbon Score: " + oldScore);
}

function getOldScore() {
  $.ajax({
    url: "/get-old-score",
    dataType: "json",
    type: "GET",
    success: function (data) {
        data = data[0].oldscore;
        if (data != null) {
          oldScore = data;
          setScore();
        } else {
          oldScore = 0;
          setScore();
        }
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }

  });
}