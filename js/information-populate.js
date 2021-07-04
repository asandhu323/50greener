$(function() {
    
    $("#water-tab").on('click', function() {
        $.ajax({
            url: "/information-stuff",
            type: "GET",
            dataType: "json",
            data: { flag: "water information" },
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    if (i == 0) {
                        for (let j = 0; j < data[0].Bathroom.length; j++) {
                            var tip = "<p class='tip'>" + data[i].Bathroom[j].tip + "</p><p class='reason'>" + data[i].Bathroom[j].body + "</p><p class='url'><a href='"+ data[i].Bathroom[j].link +"' target='_blank'>Click here for more information</a></p>";
                            $("#water-content").append(tip);
                        };
                    };
                    if (i == 1) {
                        for (let j = 0; j < data[1].Cooking.length; j++) {
                            var tip = "<p class='tip'>" + data[i].Cooking[j].tip + "</p><p class='reason'>" + data[i].Cooking[j].body + "</p><p class='url'><a href='"+ data[i].Cooking[j].link +"' target='_blank'>Click here for more information</a></p>";
                            $("#water-content").append(tip);
                        };
                    };
                    if (i == 2) {
                        for (let j = 0; j < data[i].Dishes.length; j++) {
                            var tip = "<p class='tip'>" + data[i].Dishes[j].tip + "</p><p class='reason'>" + data[i].Dishes[j].body + "</p><p class='url'><a href='"+ data[i].Dishes[j].link +"' target='_blank'>Click here for more information</a></p>";
                            $("#water-content").append(tip);
                        };
                    };
                    if (i == 3) {
                        for (let j = 0; j < data[i].Laundry.length; j++) {
                            var tip = "<p class='tip'>" + data[i].Laundry[j].tip + "</p><p class='reason'>" + data[i].Laundry[j].body + "</p><p class='url'><a href='"+ data[i].Laundry[j].link +"' target='_blank'>Click here for more information</a></p>";
                            $("#water-content").append(tip);
                        };
                    };
                };
                $("#food-content").empty();
                $("#commute-content").empty();
                $("#home-content").empty();
                $("#other-content").empty();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#content").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }
        });
    });

    $("#food-tab").on('click', function() {
        $.ajax({
            url: "/information-stuff",
            type: "GET",
            dataType: "json",
            data: { flag: "food information" },
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    var tip = "<p class='tip'>" + data[i].tip + "</p><p class='reason'>" + data[i].body + "</p><p class='url'>Click <a href='"+ data[i].link +"'>here </a>for more information</p>";
                    $("#food-content").append(tip);
                }
                $("#water-content").empty();
                $("#commute-content").empty();
                $("#home-content").empty();
                $("#other-content").empty();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#content").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }
        });
    });

    $("#commute-tab").on('click', function() {
        $.ajax({
            url: "/information-stuff",
            type: "GET",
            dataType: "json",
            data: { flag: "commute information" },
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    var tip = "<p class='tip'>" + data[i].tip + "</p><p class='reason'>" + data[i].body + "</p><p class='url'>Click <a href='"+ data[i].link +"'>here </a>for more information</p>";
                    $("#commute-content").append(tip);
                }
                $("#water-content").empty();
                $("#food-content").empty();
                $("#home-content").empty();
                $("#other-content").empty();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#content").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }
        });
    });
    
    $("#home-tab").on('click', function() {
        $.ajax({
            url: "/information-stuff",
            type: "GET",
            dataType: "json",
            data: { flag: "home information" },
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    var tip = "<p class='tip'>" + data[i].tip + "</p><p class='reason'>" + data[i].body + "</p><p class='url'>Click <a href='"+ data[i].link +"'>here </a>for more information</p>";
                    $("#home-content").append(tip);
                }
                $("#water-content").empty();
                $("#food-content").empty();
                $("#commute-content").empty();
                $("#other-content").empty();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#content").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }
        });
    });

    $("#links-tab").on('click', function() {
        $.ajax({
            url: "/information-stuff",
            type: "GET",
            dataType: "json",
            data: { flag: "other information" },
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    var tip = "<p class='tip'>" + data[i].tip + "</p><p class='reason'>" + data[i].body + "</p><p class='url'>Click <a href='"+ data[i].link +"'>here </a>for more information</p>";
                    $("#other-content").append(tip);
                }
                $("#water-content").empty();
                $("#food-content").empty();
                $("#commute-content").empty();
                $("#home-content").empty();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#content").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }
        });
    });
});