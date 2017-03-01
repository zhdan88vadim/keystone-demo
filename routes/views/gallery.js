var keystone = require('keystone');
var Gallery = keystone.list('Gallery');
var ImageGallery = require('../../services/image-gallery');
var BaseView = require('./baseView');


exports.list = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    var viewModel = locals.viewModel = {};

    BaseView.addBaseActions(view, viewModel);

    viewModel.activeRoute = 'gallery';

    //view.query('galleries', Gallery.model.find().sort('sortOrder'));

    // Load all galleries
    view.on('init', function (next) {
        ImageGallery.getAll(function(err, galleries) {
            locals.galleries = galleries;

            next();
        });
    });

    // view.on('get', {action: 'update'}, function (next) {
    //
    //     console.log('action update');
    //
    //     ImageGallery.updateGallery();
    //     next();
    // });

    view.render('chlw/gallery');
}


exports.album = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    var viewModel = locals.viewModel = {};

    BaseView.addBaseActions(view, viewModel);
    
    viewModel.activeRoute = 'gallery';

    locals.filters = {
        album: req.params.album,
        //album: req.query.album
    };

    view.on('get', function (next) {

        ImageGallery.getImagesByGalleryName(locals.filters.album, function(err, galleryName, images) {
            locals.galleryName = galleryName;
            locals.images = images;

            console.log('album', images);
            next();
        });
    });

    view.render('chlw/photo-album');
}

exports.update = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    var viewModel = locals.viewModel = {};

    view.on('get', function (next) {

        console.log('action update');
        ImageGallery.updateGallery();
        next();
    });

    view.render('chlw/photo-album');
}