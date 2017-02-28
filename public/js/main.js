$(document).ready(function () {

    $('#slide').bjqs({
        // animtype: 'slide',
        //height: 400,
        width: null,
        responsive: true,
        randomstart: true,
        automatic: false,
        usecaptions: true,
        animduration: 450,
        animspeed: 4000,
        showcontrols: false
    });

    $("a.fancy-img").fancybox({
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'speedIn': 600,
        'speedOut': 200,
        'overlayShow': false
    });

});