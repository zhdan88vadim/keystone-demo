//var ImageGallery = require('../services/image-gallery');


var fs = require('fs');

fs.readdir('D:\\work\\images\\', function(err, files) {
    if (err) throw err;

    files.forEach(function(file) {
        fs.lstat('D:\\work\\images\\' + file, function(err, stats) {
            if (!err && stats.isDirectory()) {
                console.log('folder: ' + file);
            } else {
                console.log('file: ' + file);
            }
        });
    });
});