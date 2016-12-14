var keystone = require('keystone');


exports.createPreviewImage = function(filename, outputFile, callback) {

    var fullFileName = keystone.expandPath(filename);
    var fullOutputFile = keystone.expandPath(outputFile);

    // resize and remove EXIF profile data
    gm(fullFileName)
        .resize(240, 240)
        .noProfile()
        .write(fullOutputFile, function(err) {
            if (err) callback(err);
            callback(null);
        });
}