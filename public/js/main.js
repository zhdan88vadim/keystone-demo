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

function ajaxErrorHandling(error) {
    //console.log(error);
    alert(error.responseText);
}

function initAdminUI() {
    
    $('.update-album').on('click', function(e) {
        
        var data = {
            key: $(this).data().galleryKey,
            dir: $(this).data().galleryDir
        };

        $.ajax({
            type: 'POST',
            url: '/api/gallery/update',
            data: JSON.stringify(data),
            success: function(data) { location.reload(); },
            contentType: "application/json",
            dataType: 'json'
        });
        
        return false;
    });

    $('.delete-album').on('click', function(e) {
        var data = {
            key: $(this).data().galleryKey
        };

        var r = confirm("Вы действительно хотите удалить элемент \n" + data.key + " ? \n");
        if (!r) return;

        $.ajax({
            type: 'DELETE',
            url: '/api/gallery/',
            data: JSON.stringify(data),
            success: function(data) { location.reload(); },
            error: ajaxErrorHandling,
            contentType: "application/json",
            dataType: 'json'
        });

        return false;
    });

    $('.delete-img').on('click', function(e) {

        var r = confirm("Вы действительно хотите удалить элемент ? \n");
        if (!r) return;

        var data = {
            image: $(this).data().galleryImage,
            galleryKey: $(this).data().galleryKey
        };

        $.ajax({
            type: 'DELETE',
            url: '/api/gallery/image',
            data: JSON.stringify(data),
            success: function(data) { location.reload(); },
            error: ajaxErrorHandling,
            contentType: "application/json",
            dataType: 'json'
        });

        return false;
    });

    $('#polaroid-new-gallery').on('click', function(e) {
        
        var galleryName = prompt("Введите название галерии");
        if (!galleryName) return;

        $.ajax({
            type: 'POST',
            url: '/api/gallery/',
            data: JSON.stringify({name: galleryName}),
            success: function(data) { location.reload(); },
            error: ajaxErrorHandling,
            contentType: "application/json",
            dataType: 'json'
        });
        
        return false;
    });
}


Dropzone.options.galleryDropzone = {
  maxFilesize: 2, // MB
  parallelUploads: 10
};
