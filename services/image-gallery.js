var keystone = require('keystone');
var fs = require('fs');
var ImageConverting = require('../services/image-converting');
var path = require('path');
var Gallery = keystone.list('Gallery');
var lodash = require('lodash');
var app = require('../keystone');

var galleryFilePath = app.rootAppDir() + '/public/uploads/gallery/img/';

console.log('galleryFilePath', galleryFilePath);

var getAll = function(callback) {
    Gallery.model.find().sort('sortOrder').exec(function(err, results) {
        if (err) {
            callback(err);
        } else {
            callback(null, results);
        }
    });
}

var getImagesByGalleryKey = function(key, callback) {

    Gallery.model.findOne().where('key', key).exec(function(err, item) {
        if (err) {
            callback(err);
        } else {
            if (!item) return callback('item not found');

            var files = item.uploadFiles;
            var fileUrls = [];

            files.forEach(function(file) {
                fileUrls.push(file.filename);
            });

            callback(null, item.key, item.name, fileUrls);
        }
    });
}

var getRandomImages = function(count, callback) {

    var getGalleryCount = new Promise(function(resolve, reject) {
        Gallery.model.find({}).count().exec(function(err, result) {
            err ? reject(err) : resolve(result);
        })
    });

    function getImages(countGallery) {

        Gallery.model.find({})
            .skip(Math.random() * countGallery).limit(1)
            .exec(function(err, item) {
                if (err) {
                    callback(err);
                } else {

                    if (!item[0]) return callback('item not found');

                    var files = item[0].uploadFiles.slice(0, count);
                    var fileUrls = [];

                    files.forEach(function(file) {
                        fileUrls.push(file.filename);
                    });

                    callback(null, item[0].key, item[0].name, fileUrls);
                }
            });
    }

    getGalleryCount.then(function(result) {
        getImages(result);
    });
}

var getAllGalleryDirNotInDB = function(callback) {

    var getGalleries = new Promise(function(resolve, reject) {
        Gallery.model.find({}).exec(function(err, result) {
            err ? reject(err) : resolve(result);
        });
    });

    var getDirs = new Promise(function(resolve, reject) {
        var dirs = [];

        searchFiles(galleryFilePath, function(err, searchResult) {
            if (err) reject(err);

            if (searchResult.isDir) {
                dirs.push(searchResult.filename);
            }
        });

        resolve(dirs);
    });

    getGalleries.then(function(resultGalleries) {
        getDirs.then(function(resultDirs) {
            var dirsIsNotInDB = [];

            resultDirs.forEach(function(dir) {

                var isFound = false;

                for (var i = 0; i < resultGalleries.length; i++) {
                    if (resultGalleries[i].name === dir) {
                        isFound = true;
                        break;
                    }
                }

                if (!isFound) {
                    dirsIsNotInDB.push(dir);
                }

            });

            callback(null, dirsIsNotInDB);
        }, function(err) {
            callback(err);
        });

    }, function(err) {
        callback(err);
    });
}

var updateGalleryByDirName = function(dirName, fullPath, callback) {
    var files = [];

    if (!fullPath) {
        fullPath = getGalleryFullPath(dirName);

        if (!fs.existsSync(fullPath)) callback('Dir not found')
    }

    searchFiles(fullPath, function(err, innerFile) {

        if (!innerFile.isDir) {
            files.push(innerFile.filename)
        }
    });

    deleteGallaryByName(dirName);
    createAlbum(dirName, files, callback);
}

var updateGalleryByDirKey = function(dirKey, callback) {

    Gallery.model.findOne().where('key', dirKey).exec(function(err, gallery) {

        if (!gallery) {
            callback('gallery by key not found');
        } else {
            updateGalleryByDirName(gallery.name, null, callback);
        }
    });
}

function searchFiles(dir, callback) {

    try {
        var files = fs.readdirSync(dir);

        files.forEach(function(file) {

            var stats = fs.lstatSync(dir + '/' + file);
            var isDir = stats.isDirectory();

            callback(null, {
                isDir: isDir,
                fullPath: dir + '/' + file,
                filename: file
            });
        });

    } catch (e) {
        callback(e);
        //console.log('searchFiles: ', e);
    }
}


// https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback
// How to update the field?  https://github.com/keystonejs/keystone/issues/694

var uploadFile = function(galleryKey, newFileName, filePath, callback) {
    
    Gallery.model.findOne().where('key', galleryKey).exec(function(err, gallery) {

        if (!gallery) {
            callback('gallery by key not found');
        } else {

            var fullPathToNewFile = getGalleryFullPath(gallery.name) + newFileName;

            if(fs.existsSync(fullPathToNewFile)) {
                callback('file with the same name is exists');
                return;
            }

            fs.readFile(filePath, function (err, data) {
                fs.writeFile(fullPathToNewFile, data, {flags: 'wx'}, function (err) {

                    if (err) {
                        callback(err);
                        return;
                    }

                    gallery.uploadFiles.push({filename: newFileName});
                    gallery.save(function(err) {
                        if (err) {
                            callback(err);
                            return;
                        }

                        createPreviewImg(gallery.name, [newFileName], function(err) {
                            callback(err, newFileName);
                        });
                    });
                });
            });
        }
    });
}


function createPreviewImg(galleryName, files, callback) {
    var errors = [];

    var albumDir = getGalleryFullPath(galleryName);
    var previewDir = albumDir + 'preview/';

    if (!fs.existsSync(previewDir)) {
        fs.mkdirSync(previewDir);
    }

    files.forEach(function(file) {
        ImageConverting.createPreviewImage(albumDir + file,
            previewDir + file,
            function(err) {
                errors.push(err);
            });
    });

    // TODO: not work because image handling is async function
    if (callback) callback(errors.length === 0 ? null : errors);
}

function getGalleryFullPath(name) {
    return galleryFilePath + name + '/';
}

function deleteGallaryByName(name, callback) {
    Gallery.model.find({ 'name': name }).remove(function(err) {
        if (callback) callback(err);
    });
}

function createAlbum(name, files, callback) {
    var newGallery = new Gallery.model({
        name: name
    });

    files.forEach(function(file) {
        newGallery.uploadFiles.push({ filename: file });
    });

    newGallery.save(function(err) {
        if (!err) {
            createPreviewImg(name, files, function(err) {
                if (callback) callback(err, newGallery.key);
            })
        }
    });
}

var createGallery = function(name, callback) {
    var albumDir = getGalleryFullPath(name);

    if (!fs.existsSync(albumDir)) {
        try {
            fs.mkdirSync(albumDir);
            createAlbum(name, [], callback);
        }
        catch(e) {
            callback(e);
        }
    } else {
        callback('Error! Gallery with the same name already exists!');
    }
}

var deleteFolderRecursive = function(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file, index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

var deleteGallery = function(key, callback) {
    Gallery.model.findOne({ 'key': key }).exec(function(err, gallery) {
        if (!gallery) {
            callback('gallery by key not found');
        } else {
            deleteFolderRecursive(getGalleryFullPath(gallery.name));
            deleteGallaryByName(gallery.name, callback);
        }
    });
}

var deleteImage = function(galleryKey, image, callback) {
    Gallery.model.update({'key': galleryKey}, { $pull: {'uploadFiles': {filename: image}}}, function(err, data) {
        callback(err, data);
    });
}

var removeFiles = function(path, files) {

    files.forEach(function(file){
        if(fs.existsSync(path + file)) {
            fs.unlink(path + file, function(err){
                if (err) console.log('Error! removesFile', path + file);
                //console.log(path + file + " deleted");
            });
        } else {
            //console.log('Warning! removesFile: file not found', path + file);
        }
    });
}


module.exports = {
    getRandomImages: getRandomImages,
    createGallery: createGallery,
    deleteGallery: deleteGallery,
    deleteImage: deleteImage,
    getAll: getAll,
    uploadFile: uploadFile,
    removeFiles: removeFiles,
    updateGalleryByDirName: updateGalleryByDirName,
    getAllGalleryDirNotInDB: getAllGalleryDirNotInDB,
    getImagesByGalleryKey: getImagesByGalleryKey,
    updateGalleryByDirKey: updateGalleryByDirKey
};




// var updateGallery = function() {
//     deleteAllGallaries();
//     searchFiles(galleryFilePath, function(err, result) {
//         if (result.isDir) {
//             updateGalleryByDirName(result.filename, result.fullPath);
//         }
//     });
// }

// function deleteAllGallaries() {
//     Gallery.model.find().remove(function(err) {
//         console.log(err);
//     });
// }