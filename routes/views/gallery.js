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
                console.log('log', dirIsNotInDB);
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

exports.update = function(req, res) {
    if (req.body.dir) {
        ImageGallery.updateGalleryByDirName(req.body.dir, null, function(err, result) {
            res.send(JSON.stringify({ result: result, error: err }));
        });
    } else if (req.body.key) {

        ImageGallery.updateGalleryByDirKey(req.body.key, function(err, result) {
            res.send(JSON.stringify({ result: result, error: err }));
        });
    }

    res.setHeader('Content-Type', 'application/json');
}

exports.create = function(req, res) {
    ImageGallery.create(req.body.name, function(err, result) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ result: result, error: err }));
    });
}

exports.delete = function(req, res) {
    ImageGallery.delete(req.body.key, function(err, result) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ result: result, error: err }));
    });
}

exports.file_upload = function(req, res) {
    var newFileName = req.files.file.size + '_' + req.files.file.originalname;

    ImageGallery.uploadFile(req.params.album_key, newFileName, req.files.file.path, function(err, result) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ result: result, error: err }));
    });
}







// help source

// // node_modules\keystone\lib\view.js
// view.render('', null, function() {
//     return res.redirect('/gallery');
// });