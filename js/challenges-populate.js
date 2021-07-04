$(function () {
    $.ajax({
        url: "/challenges-populate-water",
        type: "GET",
        dataType: "json",
        data: { flag: "water challenges" },
        success: function (data) {
            $('#water').html(
                "<div class='challenges'><span class='details'>" + data[0].challenge + "</span><input type='checkbox' class='check' /><span class='points'>" + data[0].points + " pts</span></div>" +
                "<div class='challenges'><span class='details'>" + data[1].challenge + "</span><input type='checkbox' class='check' /><span class='points'>" + data[1].points + " pts</span></div>" +
                "<div class='challenges'><span class='details'>" + data[2].challenge + "</span><input type='checkbox' class='check' /><span class='points'>" + data[2].points + " pts</span></div>"
            );
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#content").text(jqXHR.statusText);
            console.log("ERROR:", jqXHR, textStatus, errorThrown);
        }
    });

    $.ajax({
        url: "/challenges-populate-food",
        type: "GET",
        dataType: "json",
        data: { flag: "food challenges" },
        success: function (data) {
            $('#food').html(
                "<div class='challenges'><span class='details'>" + data[0].challenge + "</span><input type='checkbox' class='check' /><span class='points'>" + data[0].points + " pts</span></div>" +
                "<div class='challenges'><span class='details'>" + data[1].challenge + "</span><input type='checkbox' class='check' /><span class='points'>" + data[1].points + " pts</span></div>" +
                "<div class='challenges'><span class='details'>" + data[2].challenge + "</span><input type='checkbox' class='check' /><span class='points'>" + data[2].points + " pts</span></div>"
            );
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#content").text(jqXHR.statusText);
            console.log("ERROR:", jqXHR, textStatus, errorThrown);
        }
    });

    $.ajax({
        url: "/challenges-populate-commute",
        type: "GET",
        dataType: "json",
        data: { flag: "commute challenges" },
        success: function (data) {
            $('#commute').html(
                "<div class='challenges'><span class='details'>" + data[0].challenge + "</span><input type='checkbox' class='check' /><span class='points'>" + data[0].points + " pts</span></div>" +
                "<div class='challenges'><span class='details'>" + data[1].challenge + "</span><input type='checkbox' class='check' /><span class='points'>" + data[1].points + " pts</span></div>" +
                "<div class='challenges'><span class='details'>" + data[2].challenge + "</span><input type='checkbox' class='check' /><span class='points'>" + data[2].points + " pts</span></div>"
            );
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#content").text(jqXHR.statusText);
            console.log("ERROR:", jqXHR, textStatus, errorThrown);
        }
    });

    $.ajax({
        url: "/challenges-populate-home",
        type: "GET",
        dataType: "json",
        data: { flag: "home challenges" },
        success: function (data) {
            $('#home').html(
                "<div class='challenges'><span class='details'>" + data[0].challenge + "</span><input type='checkbox' class='check' /><span class='points'>" + data[0].points + " pts</span></div>" +
                "<div class='challenges'><span class='details'>" + data[1].challenge + "</span><input type='checkbox' class='check' /><span class='points'>" + data[1].points + " pts</span></div>" +
                "<div class='challenges'><span class='details'>" + data[2].challenge + "</span><input type='checkbox' class='check' /><span class='points'>" + data[2].points + " pts</span></div>"
            );
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#content").text(jqXHR.statusText);
            console.log("ERROR:", jqXHR, textStatus, errorThrown);
        }
    });
});