var keystone = require('keystone');
var ImageGalleryService = require('../../services/image-gallery');
var BaseView = require('./baseView');


exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    var viewModel = locals.viewModel = {};

    BaseView.addBaseActions(view, viewModel);

    // Load main banner
    view.on('init', function (next) {

        ImageGalleryService.getImagesByGalleryName('main_baner', function(err, galleryName, results) {
            console.log('main_baner', results);

            viewModel.mainBanner = {};
            viewModel.mainBanner.photos = results;
            viewModel.mainBanner.galleryName = galleryName;

            next();
        });

    });


    view.on('get', function (next) {

        next();

    });


    view.on('post', { action: 'comment.save'}, function (next) {
        console.log('post!');
        next();
    });


    view.on('post', function (next) {
        console.log('post!');
        next();
    });


    view.render('chlw/index', {
        section: 'home',
    });

}
