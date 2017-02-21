var keystone = require('keystone');
var fs = require('fs');
var ImageConverting = require('../services/image-converting');

var Gallery = keystone.list('Gallery');


// var fullFileName = keystone.expandPath(filename);
// var fullOutputFile = keystone.expandPath(outputFile);

var galleryFilePath = 'w:\\work_new\\keystonejs\\my\\public\\uploads\\gallery\\img\\';


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

            callback(null, item.name, fileUrls);
        }
    });
}

exports.getRandomImages = function (count, callback) {

    var getGalleryCount = new Promise(function (resolve, reject) {
            Gallery.model.find({}).count().exec(function (err, result) {
                err ? reject(err) : resolve(result);
            })
        }
    );

    function getImages(countGallery) {

        Gallery.model.find({})
            .skip(Math.random() * countGallery).limit(1)
            .exec(function (err, item) {
                if (err) {
                    callback(err);
                } else {

                    if (!item[0])
                        return callback('item not found');

                    var files = item[0].uploadFiles.slice(0, count);
                    var fileUrls = [];

                    files.forEach(function (file) {
                        fileUrls.push(file.filename);
                    });

                    callback(null, item[0].name, fileUrls);
                }
            });
    }

    getGalleryCount.then(function (result) {
        getImages(result);
    });
}

exports.updateGallery = function (err, callback) {

    DeleteAllGallaries();

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

function searchFiles(dir, callback) {

    try {
        var files = fs.readdirSync(dir);

        files.forEach(function (file) {

            var stats = fs.lstatSync(dir + '\\' + file);
            var isDir = stats.isDirectory();

            callback(null, {
                isDir: isDir,
                fullPath: dir + '\\' + file,
                filename: file
            });
        });

    } catch (e) {
        callback(err);
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
        if (!err) {
            createPreviewImg(name, files)
        }
    });
}

function createPreviewImg(galleryName, files) {
    var albumDir = galleryFilePath + galleryName + '\\';

    files.forEach(function (file) {

        ImageConverting.createPreviewImage(albumDir + file,
            albumDir + 'preview\\' + file,
            function () {
                //nextFn();
            });
    });
}

function DeleteAllGallaries() {
    Gallery.model.find().remove(function (err) {
        console.log(err);
    });
}