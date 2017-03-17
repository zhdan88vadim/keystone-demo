var keystone = require('keystone');
var fs = require('fs');
var ImageConverting = require('../services/image-converting');
var path = require('path');

var Gallery = keystone.list('Gallery');

var galleryFilePath = path.normalize(__dirname + '\\..') +  '\\public\\uploads\\gallery\\img\\';


exports.getAll = function (callback) {
    Gallery.model.find().sort('sortOrder').exec(function (err, results) {
        if (err) {
            callback(err);
        } else {
            callback(null, results);
        }
    });
}

exports.getImagesByGalleryKey = function (key, callback) {

    Gallery.model.findOne().where('key', key).exec(function (err, item) {
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

            callback(null, item.key, item.name, fileUrls);
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

                    callback(null, item[0].key, item[0].name, fileUrls);
                }
            });
    }

    getGalleryCount.then(function (result) {
        getImages(result);
    });
}

exports.getAllGalleryDirNotInDB = function (callback) {
        
        var getGalleries = new Promise(function (resolve, reject) {
                Gallery.model.find({}).exec(function (err, result) {
                    err ? reject(err) : resolve(result);
                })
            }
        );
        
        var getDirs =  new Promise(function (resolve, reject) {
            var dirs = [];

            searchFiles(galleryFilePath, function (err, searchResult) {        
                if (err) reject(err);

                if (searchResult.isDir) {
                    dirs.push(searchResult.filename);
                }                
            });
            
             resolve(dirs);
        });
        
        getGalleries.then(function(resultGalleries) {
            getDirs.then(function(resultDirs) {
                let dirsIsNotInDB = [];

                resultDirs.forEach(function (dir) {

                    let isFound = false;

                    for (let i = 0; i < resultGalleries.length; i++) {
                        if(resultGalleries[i].name === dir) {
                            isFound = true;
                            break;
                        }
                    }

                    if (!isFound) {
                        dirsIsNotInDB.push(dir);
                    }

                });

                callback(null, dirsIsNotInDB);
            });

        });
}

var updateGalleryDir = function (filename, fullPath) {
    var files = [];
    
    searchFiles(fullPath, function (err, innerFile) {

        if (!innerFile.isDir) {
            files.push(innerFile.filename)
        }
    });

    createAlbum(filename, files);
}

exports.updateGallery = function () {

    DeleteAllGallaries();

    searchFiles(galleryFilePath, function (err, result) {

        if (result.isDir) {
            updateGalleryDir(result.filename, result.fullPath);
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
        callback(e);
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
    var previewDir = albumDir + 'preview\\';

    if(!fs.existsSync(previewDir)) {
        fs.mkdirSync(previewDir);
    }

    files.forEach(function (file) {

        ImageConverting.createPreviewImage(albumDir + file,
            previewDir + file,
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