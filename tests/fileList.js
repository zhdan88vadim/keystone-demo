//var ImageGallery = require('../services/image-gallery');


var fs = require('fs');

var galleryFilePath = 'w:\\work_new\\keystonejs\\my\\public\\uploads\\gallery\\img\\';




fs.readdir(galleryFilePath, function(err, files) {
    if (err) throw err;

    files.forEach(function(file) {
        fs.lstat(galleryFilePath + file, function(err, stats) {
            if (!err && stats.isDirectory()) {
                console.log('folder: ' + file);

                //
                // createAlbum(file);
                // populateFiles();




            } else {
                console.log('file: ' + file);
            }
        });
    });
});