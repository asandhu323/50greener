'use strict';

$(function () {

  $(".options").on("click", function () {
    $("#dropdowncontent").css("display", "none");
    $("#hammenu").css("background-color", "transparent");
  });

  $(document).on("click", function (e) {
    var container = $("#dropdown");
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (!container.is(e.target) && container.has(e.target).length === 0 && viewportWidth < 1000) 
    {
        $("#dropdowncontent").css("display", "none");
        $("#hammenu").css("background-color", "transparent");
    }
  });
  
  window.addEventListener('resize', function () {
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (viewportWidth > 1000) {
      $("#dropdowncontent").css("display", "flex");
      $("#dropdowncontent").css("justify-content", "space-around");
      $("#dropdowncontent").css("align-items", "center");
      $("#dropdowncontent").css("flex-direction", "row");
    } else {
      $("#dropdowncontent").css("display", "none");
      $("#hammenu").css("background-color", "transparent");
    }
  });

  $("#hammenu").on("click", function () {
    $("#dropdowncontent").css("display", "flex");
    $("#dropdowncontent").css("justify-content", "center");
    $("#dropdowncontent").css("align-items", "center");
    $("#dropdowncontent").css("flex-direction", "column");
    $("#hammenu").css("background-color", "rgb(93, 184, 102)");
  });



  $("#index-signup").on("click", function () {
    $.ajax({
      url: "/signup",
      dataType: "html",
      type: "GET",
      data: {
        format: "signup"
      },
      success: function (data) {
        document.documentElement.innerHTML = data;
        var temp1 = "<script id='signup-script' src='../js/signup.js'></script>";
        var temp2 = "<script id='client-script' src='../js/client.js'></script>";
        var temp3 = "<script id='jquery-script' src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'></script>";
        $("#signup-script").replaceWith(temp1);
        $("#client-script").replaceWith(temp2);
        $("#jquery-script").replaceWith(temp3);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#content").text(jqXHR.statusText);
        console.log("ERROR:", jqXHR, textStatus, errorThrown);
      }
    });
  });

  $("#index-login").on("click", function () {
    $.ajax({
      url: "/login",
      dataType: "html",
      type: "GET",
      data: {
        format: "login"
      },
      success: function (data) {
        document.documentElement.innerHTML = data;
        var temp1 = "<script src='../js/login.js'></script>";
        var temp2 = "<script id='client-script' src='../js/client.js'></script>";
        var temp3 = "<script id='jquery-script' src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'></script>";
        var temp4 = "<script id='google-script' src='https://apis.google.com/js/platform.js'></script>";
        $("#login-script").replaceWith(temp1);
        $("#client-script").replaceWith(temp2);
        $("#jquery-script").replaceWith(temp3);
        $("#google-script").replaceWith(temp4);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#content").text(jqXHR.statusText);
        console.log("ERROR:", jqXHR, textStatus, errorThrown);
      }
    });
  });

  $("#mainpage").on("click", function () {
    $.ajax({
      url: "/mainpage",
      dataType: "html",
      type: "GET",
      data: {
        format: "mainpage"
      },
      success: function (data) {
        document.documentElement.innerHTML = data;
        var temp1 = "<script id='jquery-script' src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'></script>";
        var temp2 = "<script id='client-script' src='../js/client.js'></script>";
        $("#jquery-script").replaceWith(temp1);
        $("#client-script").replaceWith(temp2);
        if (document.getElementById("mainpage-identifier") != null) {
          var temp3 = "<script id='cloudflare-script' src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.2.0/chart.min.js'></script>";
          var temp4 = "<script id='semicircle-script' src='../js/mainpage-semicircle.js'></script>";
          var temp5 = "<script id='piechart-script' src='../js/mainpage-pie-chart.js'></script>";
          var temp6 = "<script id='progressbar-script' src='https://cdnjs.cloudflare.com/ajax/libs/progressbar.js/1.1.0/progressbar.min.js' charset='utf-8'></script>";
          var temp7 = '<script id="tweet-script" async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';
          $("#cloudflare-script").replaceWith(temp3);
          $("#semicircle-script").replaceWith(temp4);
          $("#piechart-script").replaceWith(temp5);
          $("#progressbar-script").replaceWith(temp6);
          $("#tweet-script").replaceWith(temp7);
        } else {
          console.log("redirect");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#content").text(jqXHR.statusText);
        console.log("ERROR:", jqXHR, textStatus, errorThrown);
      }
    });
  });

  $("#challenges").on("click", function () {
    $.ajax({
      url: "/challenges",
      dataType: "html",
      type: "GET",
      data: {
        format: "challenges"
      },
      success: function (data) {
        document.documentElement.innerHTML = data;
        var temp1 = "<script id='jquery-script' src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'></script>";
        var temp2 = "<script id='client-script' src='../js/client.js'></script>";
        $("#jquery-script").replaceWith(temp1);
        $("#client-script").replaceWith(temp2);
        if (document.getElementById("challenges-identifier") != null) {
          var temp3 = "<script id='challenges-tabs-script' src='../js/tabs-challenges.js'></script>";
          var temp4 = "<script id='progressbar-script' src='https://cdnjs.cloudflare.com/ajax/libs/progressbar.js/1.1.0/progressbar.js'></script>";
          var temp5 = "<script id='challenges-populate' src='../js/challenges-populate.js'></script>"
          $("#challenges-tabs-script").replaceWith(temp3);
          $("#progressbar-script").replaceWith(temp4);
          $("#challenges-populate").replaceWith(temp5);
        } else {
          console.log("redirect");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#content").text(jqXHR.statusText);
        console.log("ERROR:", jqXHR, textStatus, errorThrown);
      }
    });
  });

  $("#information").on("click", function () {
    $.ajax({
      url: "/information",
      dataType: "html",
      type: "GET",
      data: {
        format: "information"
      },
      success: function (data) {
        document.documentElement.innerHTML = data;
        var temp1 = "<script id='jquery-script' src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'></script>";
        var temp2 = "<script id='client-script' src='../js/client.js'></script>";
        $("#jquery-script").replaceWith(temp1);
        $("#client-script").replaceWith(temp2);
        if (document.getElementById("information-identifier") != null) {
          var temp3 = "<script id='information-tabs-script' src='../js/tabs-information.js'></script>";
          $("#information-tabs-script").replaceWith(temp3);
          var temp4 = "<script id='client-script' src='../js/information-populate.js'></script>"
          $("#information-populate").replaceWith(temp4);
        } else {
          console.log("redirect");
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#content").text(jqXHR.statusText);
        console.log("ERROR:", jqXHR, textStatus, errorThrown);
      }
    });
  });




  $("#about").on("click", function () {
    $.ajax({
      url: "/about",
      dataType: "html",
      type: "GET",
      data: {
        format: "about"
      },
      success: function (data) {
        document.documentElement.innerHTML = data;
        var temp1 = "<script id='jquery-script' src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'></script>";
        var temp2 = "<script id='client-script' src='../js/client.js'></script>";
        $("#jquery-script").replaceWith(temp1);
        $("#client-script").replaceWith(temp2);
        if (document.getElementById("about-identifier") != null) {
          var temp3 = "<script id='about-script' src='../js/about.js'></script>";
          var temp4 = "<script id='egg-script' src='../js/egg.js'></script>";
          $("#about-script").replaceWith(temp3);
          $("#egg-script").replaceWith(temp4);

        } else {
          console.log("redirect");
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#content").text(jqXHR.statusText);
        console.log("ERROR:", jqXHR, textStatus, errorThrown);
      }
    });
  });

  $("#goals").on("click", function () {
    $.ajax({
      url: "/goals",
      dataType: "html",
      type: "GET",
      data: {
        format: "goals"
      },
      success: function (data) {
        document.documentElement.innerHTML = data;
        var temp1 = "<script id='jquery-script' src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'></script>";
        var temp2 = "<script id='client-script' src='../js/client.js'></script>";
        $("#jquery-script").replaceWith(temp1);
        $("#client-script").replaceWith(temp2);
        if (document.getElementById("goals-identifier") != null) {
          var temp3 = "<script id='goals-script' src='../js/goals.js'></script>";
          var temp4 = "<script id='barfiller-script' src='../js/jquery.barfiller.js'></script>";
          var temp5 = "<script id='maingoalbar-script' src='../js/maingoal-bar.js'></script>";
          $("#goals-script").replaceWith(temp3);
          $("#barfiller-script").replaceWith(temp4);
          $("#maingoalbar-script").replaceWith(temp5);
        } else {
          console.log("redirect");
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#content").text(jqXHR.statusText);
        console.log("ERROR:", jqXHR, textStatus, errorThrown);
      }
    });
  });

  $("#settings").on("click", function () {
    $.ajax({
      url: "/settings",
      dataType: "html",
      type: "GET",
      data: {
        format: "settings"
      },
      success: function (data) {
        document.documentElement.innerHTML = data;
        var temp1 = "<script id='jquery-script' src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'></script>";
        var temp2 = "<script id='client-script' src='../js/client.js'></script>";
        $("#jquery-script").replaceWith(temp1);
        $("#client-script").replaceWith(temp2);
        if (document.getElementById("goals-identifier") != null) {
          console.log("no redirect");
        } else {
          console.log("redirect");
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#content").text(jqXHR.statusText);
        console.log("ERROR:", jqXHR, textStatus, errorThrown);
      }
    });
  });

  $("#change-user-save-btn").on("click", function (e) {

    e.preventDefault();

    $.ajax({
      url: "/changeUsername",
      type: "POST",
      dataType: "JSON",
      data: {
        changeUsername: $("#change-username").val()
      },
      success: function (data) {
        if (data['status'] == "success") {

          $("#user-errorMsg").html("");
          $("#user-successMsg").html(data['msg']);
          $("#change-username").val("");

        } else {
          $("#user-errorMsg").html(data['msg']);
          $("#change-username").val("");
        }

      },
      error: function (data) {
        $("#change-username").val("");
        var errors = JSON.parse(data.responseText);
        var errorsContainer = $('#user-errorMsg');
        errorsContainer.innerHTML = '';
        var errorsList = '';

        for (var i = 0; i < errors.length; i++) {
          errorsList += '<li>' + errors[i].msg + '</li>';
        }
        errorsContainer.html(errorsList);
      }
    });

  });

  $("#change-user-clear-btn").on("click", function () {
    $("#change-username").val("");
  });

  $("#change-pass-save-btn").on("click", function (e) {

    e.preventDefault();

    $.ajax({
      url: "/changePassword",
      type: "POST",
      dataType: "JSON",
      data: {
        changePassword: $("#change-password").val()
      },
      success: function (data) {
        if (data['status'] == "success") {

          $("#pass-errorMsg").html("");
          $("#pass-successMsg").html(data['msg']);
          $("#change-password").val("");

        } else {
          $("#pass-errorMsg").html(data['msg']);
          $("#change-password").val("");
        }

      },
      error: function (data) {
        $("#change-password").val("");
        var errors = JSON.parse(data.responseText);
        var errorsContainer = $('#pass-errorMsg');
        errorsContainer.innerHTML = '';
        var errorsList = '';

        for (var i = 0; i < errors.length; i++) {
          errorsList += '<li>' + errors[i].msg + '</li>';
        }
        errorsContainer.html(errorsList);
      }
    });

  });

  $("#change-pass-clear-btn").on("click", function () {
    $("#change-password").val("");
  });

  $("#delete-btn").on("click", function (e) {

    e.preventDefault();

    $.ajax({
      url: "/deleteUser",
      type: "POST",
      dataType: "JSON",
      data: {
        confirmUsername: $("#delete-account-user").val(),
        confirmPassword: $("#delete-account-pass").val()
      },
      success: function (data) {
        if (data['status'] == "success") {

          $.ajax({
            url: "/logout",
            dataType: "html",
            type: "GET",
            data: {
              format: "logout"
            },
            success: function (data) {
              document.documentElement.innerHTML = data;
              var temp1 = "<script id='jquery-script' src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'></script>";
              var temp2 = "<script id='client-script' src='../js/client.js'></script>";
              $("#jquery-script").replaceWith(temp1);
              $("#client-script").replaceWith(temp2);
            },
            error: function (jqXHR, textStatus, errorThrown) {
              $("#content").text(jqXHR.statusText);
              console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }
          });

        } else {
          $("#delete-errorMsg").html(data['msg']);
          $("#delete-account-user").val("");
          $("#delete-account-pass").val("");
        }

      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#errorMsg").text(jqXHR.statusText);
      }
    });

  });

  $("#delete-clear-btn").on("click", function () {
    $("#delete-account-user").val("");
    $("#delete-account-pass").val("");
  });

  $("#nav-login").on("click", function () {
    $.ajax({
      url: "/login",
      dataType: "html",
      type: "GET",
      data: {
        format: "login"
      },
      success: function (data) {
        document.documentElement.innerHTML = data;
        var temp1 = "<script src='../js/login.js'></script>";
        var temp2 = "<script id='client-script' src='../js/client.js'></script>";
        var temp3 = "<script id='jquery-script' src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'></script>";
        var temp4 = "<script id='google-script' src='https://apis.google.com/js/platform.js'></script>";
        $("#login-script").replaceWith(temp1);
        $("#client-script").replaceWith(temp2);
        $("#jquery-script").replaceWith(temp3);
        $("#google-script").replaceWith(temp4);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#content").text(jqXHR.statusText);
        console.log("ERROR:", jqXHR, textStatus, errorThrown);
      }
    });
  });

  $("#nav-logout").on("click", function () {
    $.ajax({
      url: "/logout",
      dataType: "html",
      type: "GET",
      data: {
        format: "logout"
      },
      success: function (data) {
        document.documentElement.innerHTML = data;
        var temp1 = "<script id='jquery-script' src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'></script>";
        var temp2 = "<script id='client-script' src='../js/client.js'></script>";
        var temp3 = "<script id='google-script' src='https://apis.google.com/js/platform.js'></script>";
        $("#jquery-script").replaceWith(temp1);
        $("#client-script").replaceWith(temp2);
        $("#google-script").replaceWith(temp3);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#content").text(jqXHR.statusText);
        console.log("ERROR:", jqXHR, textStatus, errorThrown);
      }
    });
  });

  $("#retake-survey").on("click", function () {
    goSurvey();
  });

});

function goSurvey() {
  $.ajax({
    url: "/survey-intro",
    dataType: "html",
    type: "GET",
    data: {
      format: "survey-intro"
    },
    success: function (data) {
      document.documentElement.innerHTML = data;

      if (document.getElementById("survey-intro-identifier") != null) {
        changeToSurveyPage();
      } else {
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#content").text(jqXHR.statusText);
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }
  });
}

function changeToSurveyPage() {
  var script1 = document.createElement('script');
  script1.id = "jquery-script";
  script1.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
  script1.type = "text/javascript";
  script1.onload = function () {
    // var script2 = document.createElement('script');
    // script2.id = "client-script";
    // script2.src = "../js/client.js";
    // script2.type = "text/javascript";
    //   script2.onload = function() {
    var script3 = document.createElement('script');
    script3.id = "survey-script";
    script3.src = "../js/survey.js";
    script3.type = "text/javascript";
    document.getElementById('survey-script').replaceWith(script3);
  }
  //     document.getElementById('client-script').replaceWith(script2);
  // }
  document.getElementById('jquery-script').replaceWith(script1);
}
