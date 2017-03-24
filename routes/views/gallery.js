var keystone = require('keystone');
var Gallery = keystone.list('Gallery');
var ImageGallery = require('../../services/image-gallery');
var BaseView = require('./baseView');


exports.list = function(req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    var viewModel = locals.viewModel = {};

    BaseView.addBaseActions(view, viewModel);

    viewModel.activeRoute = 'gallery';

    //view.query('galleries', Gallery.model.find().sort('sortOrder'));

    // Load all galleries
    view.on('init', function(next) {
        ImageGallery.getAll(function(err, galleries) {
            viewModel.galleries = galleries;

            next();
        });
    });

    if (locals.loginUser) {
        view.on('init', function(next) {
            ImageGallery.getAllGalleryDirNotInDB(function(err, dirIsNotInDB) {
                if (err) console.log(err);
                viewModel.dirIsNotInDB = dirIsNotInDB;

                next();
            });
        });
    }

    view.render('chlw/gallery');
}

exports.album = function(req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    var viewModel = locals.viewModel = {};

    BaseView.addBaseActions(view, viewModel);

    viewModel.activeRoute = 'gallery';

    locals.filters = {
        album: req.params.album,
        //album: req.query.album
    };

    view.on('get', function(next) {

        ImageGallery.getImagesByGalleryKey(locals.filters.album, function(err, galleryKey, galleryName, images) {
            viewModel.galleryKey = galleryKey;
            viewModel.galleryName = galleryName;
            viewModel.images = images;

            console.log('album', images);
            next();
        });
    });

    view.render('chlw/photo-album');
}


// API

// List of HTTP status codes
// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes


// TODO: use handleError for all endpoints

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

exports.updateGallery = function(req, res) {   
    if (req.body.dir) {
        ImageGallery.updateGalleryByDirName(req.body.dir, null, function(err, result) {
            if (err)
                handleError(res, err, 'Failed to update gallery.', 400);
            else {
                res.status(200).json({ result: result, error: err });
            }
        });
    } else if (req.body.key) {

        ImageGallery.updateGalleryByDirKey(req.body.key, function(err, result) {
            if (err)
                handleError(res, err, 'Failed to update gallery.', 400);
            else {
                res.status(200).json({ result: result, error: err });
            }
        });
    }
}

exports.createGallery = function(req, res) {
    ImageGallery.createGallery(req.body.name, function(err, result) {
        if (err)
            handleError(res, err, 'Failed to create new gallery', 400);
        else {
            res.status(200).json({ result: result, error: err });
        }
    });
}

exports.deleteGallery = function(req, res) {
    ImageGallery.deleteGallery(req.body.key, function(err, result) {
        if (err)
            handleError(res, err, 'Failed to delete gallery.', 400);
        else {
            res.status(200).json({ result: result, error: err });
        }
    });
}

exports.deleteImage = function(req, res) {
    ImageGallery.deleteImage(req.body.galleryKey, req.body.image, function(err, result) {
        if (err)
            handleError(res, err, 'Image was not deleted.', 400);
        else {
            res.status(200).json({ result: result, error: err });
        }
    });
}

exports.file_upload = function(req, res) {
    var newFileName = req.files.file.size + '_' + req.files.file.originalname;

    ImageGallery.uploadFile(req.params.album_key, newFileName, req.files.file.path, function(err, result) {
        if (err)
            handleError(res, err, 'Image was not uploaded.', 400);
        else
            res.status(200).json({ result: result, error: err });
    });
}







// help source

// // node_modules\keystone\lib\view.js
// view.render('', null, function() {
//     return res.redirect('/gallery');
// });