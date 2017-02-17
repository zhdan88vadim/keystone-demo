var TagService = require('../../services/tag');
var UserService = require('../../services/user');
var PostService = require('../../services/post');

exports.addBaseActions = function (view, viewModel) {


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
}