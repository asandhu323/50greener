$(function () {

    let bodya, bodyb, bodyc, nava, navb, navc, count;

    bodya = 230;
    bodyb = 240;
    bodyc = 228;

    nava = 200;
    navb = 233;
    navc = 167;

    count = 0;

    $('#logo').on('click', function (e) {
        e.preventDefault();
        console.log("clicked logo")

        count++;

        if (count < 10) {

            bodya -= 15;
            bodyb += 15;
            bodyc -= 15;
            $('body').css('background-color', `rgb(${bodya}, ${bodyb}, ${bodyc})`);

            nava -= 15;
            navb += 15;
            navc -= 15;
            $('nav').css('background-color', `rgb(${nava}, ${navb}, ${navc})`);

            $('footer').css('background-color', `rgb(${nava}, ${navb}, ${navc})`);

        } else {
            count = 0;

            bodya = 230;
            bodyb = 240;
            bodyc = 228;
            $('body').css('background-color', `rgb(${bodya}, ${bodyb}, ${bodyc})`);

            nava = 200;
            navb = 233;
            navc = 167;
            $('nav').css('background-color', `rgb(${nava}, ${navb}, ${navc})`);

            $('footer').css('background-color', `rgb(${nava}, ${navb}, ${navc})`);
        }

    })

});