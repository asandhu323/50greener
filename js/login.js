"use strict";
$(function () {

  $("#login-btn").on("click", function (e) {

    e.preventDefault();

    $.ajax({
      url: "/authenticate",
      type: "POST",
      dataType: "JSON",
      data: {
        loginUsername: $("#login-username").val(),
        loginPassword: $("#login-password").val()
      },
      success: function (data) {
        if (data['status'] == "success") {

          goMain();

        } else {
          $("#errorMsg").html(data['msg']);
          $("#login-username").val("");
          $("#login-password").val("");
        }

      },
      error: function (data) {
        var errors = JSON.parse(data.responseText);
        var errorsContainer = $('#errorMsg');
        errorsContainer.innerHTML = '';
        var errorsList = '';

        for (var i = 0; i < errors.length; i++) {
          errorsList += '<li>' + errors[i].msg + '</li>';
        }
        errorsContainer.html(errorsList);
      }
    });

  });

});

// Google Authentication
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/authenticategoogle');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {

    // https://stackoverflow.com/questions/24546483/how-to-get-data-field-from-xhr-responsetext/37785293
    // How to get data from xhr responseText - Answered Jul 3 '14 at 6:35 by Sudhir Bastakoti
    // Code Start
    var resdata = xhr.responseText;
    var authenticateText = JSON.parse(resdata);
    // Code End
    console.log('Sign in: ' + authenticateText['msg']);

    if (authenticateText['msg'] == "Logged in") {
      signOut();
      goMain();
    } else {
      signOut();
      goSurvey();

    }
  };
  xhr.send(JSON.stringify({
    token: id_token
  }));
};

function goMain() {
  $.ajax({
    url: "/mainpage",
    dataType: "html",
    type: "GET",
    data: {
      format: "mainpage"
    },
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


// Google signout function
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

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
        console.log("redirect");
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

function changePage() {
  var script1 = document.createElement('script');
  script1.id = "jquery-script";
  script1.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
  script1.type = "text/javascript";
  script1.onload = function () {
    var script2 = document.createElement('script');
    script2.id = "client-script";
    script2.src = "../js/client.js";
    script2.type = "text/javascript";
    script2.onload = function () {
      var script3 = document.createElement('script');
      script3.id = "cloudflare-script";
      script3.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.2.0/chart.min.js";
      script3.type = "text/javascript";
      script3.onload = function () {
        var script4 = document.createElement('script');
        script4.id = "progressbar-script";
        script4.src = "https://cdnjs.cloudflare.com/ajax/libs/progressbar.js/1.1.0/progressbar.min.js";
        script4.type = "text/javascript";
        script4.onload = function () {
          var script5 = document.createElement('script');
          script5.id = "piechart-script";
          script5.src = "../js/mainpage-pie-chart.js";
          script5.type = "text/javascript";
          script5.onload = function () {
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
