var keystone = require('keystone');
var TagService = require('../../services/tag');
var UserService = require('../../services/user');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    var model = locals.model = {};


    // Load all tags
    view.on('init', function (next) {

        TagService.getAll(function(err, results) {
            console.log('tags', results);
            model.tags = results;

            next();
        });

    });

    // Load all users
    view.on('init', function (next) {

        UserService.getAll(function(err, results) {
            console.log('users', results);
            model.users = results;

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
