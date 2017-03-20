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

function resizeMainBanner() {
    $('#slide').height($('#slide').width()/1.6);
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
    initAdminUI();

    scrollToAnchor();
    setGoodLookingImgOnArticle();

    
    resizeMainBanner();
    $(window).resize(function(){
        resizeMainBanner();
    });
});

// fix for podfm flash player
function SetCookie(a1, a2, a3) {
}


function initAdminUI() {
    
    $('.update-album').on('click', function(e) {
        
        var data = {
            action: "update.gallery",
            key: $(this).data().galleryKey,
            dir: $(this).data().galleryDir,
        };

        $.ajax({
            type: 'POST',
            url: '/gallery/update',
            data: JSON.stringify(data),
            success: function(data) { alert('data: ' + data); },
            contentType: "application/json",
            dataType: 'json'
        });
        
        return false;
    });
}