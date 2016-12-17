var keystone = require('keystone');
var fs = require('fs');

var Gallery = keystone.list('Gallery');


exports.getAll = function (callback) {
    Gallery.model.find().sort('sortOrder').exec(function (err, results) {
        if (err) {
            callback(err);
        } else {
            callback(null, results);
        }
    });
}

exports.getImagesByGalleryName = function (name, callback) {

    Gallery.model.findOne().where('key', name).exec(function (err, item) {
        if (err) {
            callback(err);
        } else {

            if (!item)
                return callback('item not found');

            var files = item.uploadFiles;
            var fileUrls = [];

            files.forEach(function (file) {
                fileUrls.push(file.filename);
            });

            callback(null, fileUrls);
        }
    });
}

exports.updateGallery = function (err, callback) {


    function searchFiles(dir, callback) {

        try {
            var files = fs.readdirSync(dir);

            files.forEach(function (file) {
                if (!err) {
                    var stats = fs.lstatSync(dir + '\\' + file);
                    var isDir = stats.isDirectory();

                    callback(null, {
                        isDir: isDir,
                        fullPath: dir + '\\' + file,
                        filename: file
                    });
                } else {
                    callback(err);
                }
            });

        } catch (e) {
            console.log('searchFiles: ', e);
        }
    }


    function createAlbum(name, files) {
        var newGallery = new Gallery.model({
            name: name
        });

        files.forEach(function (file) {
            newGallery.uploadFiles.push({filename: file});
        });

        newGallery.save(function (err) {

        });
    }


    // var fullFileName = keystone.expandPath(filename);
    // var fullOutputFile = keystone.expandPath(outputFile);

    var galleryFilePath = 'w:\\work_new\\keystonejs\\my\\public\\uploads\\gallery\\img\\';

    Gallery.model.find().remove(function (err) {
        console.log(err);
    });

    searchFiles(galleryFilePath, function (err, result) {
        var files = [];

        if (result.isDir) {

            searchFiles(result.fullPath, function (err, innerFile) {

                if (!innerFile.isDir) {
                    files.push(innerFile.filename)
                }
            })

            createAlbum(result.filename, files);
        }
    });

}