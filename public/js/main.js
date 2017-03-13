function scrollToAnchor() {
    if (location.hash && $(location.hash).length) {
        $('html, body').scrollTop(0).animate({
            'scrollTop':   $(location.hash).offset().top
        }, 1000);
    }
}

function setGoodLookingImgOnArticle() {
    $('.article .main-img').one('load', function() {
        if (this.naturalWidth < 380) {
            $(this).addClass('small');
        }

    }).each(function() {
        if(this.complete) $(this).trigger('load');
    });
}

function initJSControls() {
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
}

$(document).ready(function () {
    initJSControls();

    scrollToAnchor();
    setGoodLookingImgOnArticle();
});

// fix for podfm flash player
function SetCookie(a1, a2, a3) {
}