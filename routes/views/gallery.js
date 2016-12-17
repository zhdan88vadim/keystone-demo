var keystone = require('keystone');
var Gallery = keystone.list('Gallery');
var ImageGallery = require('../../services/image-gallery');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.filters = {
        //album: req.params.album,
        album: req.query.album
    };

    locals.section = 'gallery';

    //view.query('galleries', Gallery.model.find().sort('sortOrder'));

    // Load all galleries
    view.on('init', function (next) {

        ImageGallery.getAll(function(err, galleries) {
            locals.galleries = galleries

            next();
        });

    });


    view.on('get', {action: 'update'}, function (next) {

        console.log('action update');

        ImageGallery.updateGallery();
        next();
    });


    view.on('get', 'album', function (next) {

        ImageGallery.getImagesByGalleryName(locals.filters.album, function(err, images) {
            console.log('album', images);
            next();
        });
    });


    view.render('gallery');

}
