$(function () {

    $('.tab-body').toggle();

    let activetab;

    $('#info').attr('style', 'display: block');

    $('.tablink, .tablink-active').on('click', 'span', function (e) {

        activetab = e.target.parentNode.id.replace('-tab', '');
        showTab(e, activetab);

    });

    function showTab(e, tabID) {
        if (e.target.id != "tabmenu") {

            $('.tablink-active').attr('class', 'tablink');
            $('.tab-body').attr('style', 'display: none');
            e.target.parentNode.className = "tablink-active";
            $(`#${tabID}`).attr('style', 'display: block');
        }

    }

});
