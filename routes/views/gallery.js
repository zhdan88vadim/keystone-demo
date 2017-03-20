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

    // view.on('get', {action: 'update'}, function (next) {
    //     console.log('action update');
    //     ImageGallery.updateGallery();
    //     next();
    // });

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

exports.update = function(req, res) {
    var view = new keystone.View(req, res);

    // view.on('get', function (next) {
    //     ImageGallery.updateGallery();
    //     next();
    // });

    // // node_modules\keystone\lib\view.js
    // view.render('', null, function() {
    //     return res.redirect('/gallery');
    // });


    view.on('post', { action: 'update.gallery' }, function(next) {

        if (req.body.dir) {
            
            ImageGallery.updateGalleryByDirName(req.body.dir, null, function(err) {
                console.log(err);
            });
        } else if (req.body.key) {

            ImageGallery.updateGalleryByDirKey(req.body.key, function(err) {
                console.log(err);
            });
        }

        next();
    });

    view.render('', null, function() {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ status: 'ok' }));
    });

}