var keystone = require('keystone');
var TagService = require('../../services/tag');
var UserService = require('../../services/user');
var PostService = require('../../services/post');
var ImageGallery = require('../../services/image-gallery');
var Post = keystone.list('Post');


exports.addBaseActions = function (view, viewModel) {

    viewModel.validationErrors = [];
    viewModel.css = {};

    // Load all tags

    view.on('init', function (next) {

        TagService.getAll(function (err, results) {
            //console.log('tags', results);
            viewModel.allTags = results;

            next();
        });
    });


    // Load all users

    view.on('init', function (next) {

        UserService.getAll(function (err, results) {
            //console.log('users', results);
            viewModel.allUsers = results;

            next();
        });
    });


    // Load all categories

    view.on('init', function (next) {

        PostService.getAllCategories(function (err, results) {
            //console.log('tags', results);
            viewModel.allCategories = results;

            next();
        });
    });


    // Load most populat posts

    view.on('init', function (next) {

        Post.model.find()
            .where('state', 'published')
            .sort('-hits')
            .populate('categories')
            .limit(7)
            .exec(function (err, posts) {
                if (err) return res.err(err);

                viewModel.mostPopularPosts = posts;

                next();
            });
    })


    // Load random gallery images

    view.on('init', function (next) {

        ImageGallery.getRandomImages(9, function(err, galleryKey, galleryName, images) {
            if (err) return images = [];

            viewModel.randomGallery = {};
            viewModel.randomGallery.images = images;
            viewModel.randomGallery.galleryName = galleryName;
            viewModel.randomGallery.galleryKey = galleryKey;

            next();
        });

    });

}