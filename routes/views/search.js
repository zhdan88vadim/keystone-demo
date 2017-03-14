var keystone = require('keystone');
var request = require('request');

var Post = keystone.list('Post');
var PostComment = keystone.list('PostComment');
var BaseView = require('./baseView');


exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    var viewModel = locals.viewModel = {};

    BaseView.addBaseActions(view, viewModel);

    view.on('init', function (next) {

        viewModel.items = {};
        viewModel.items.results = [];

        if (req.query.search.length >= 3) {
            var q = Post.model.find({state: 'published', name: new RegExp(req.query.search, "i")})
            .sort('-publishedDate')
            .populate('author categories tags');
            
            q.exec(function (err, results) {

                viewModel.items.results = results;
                next(err);
            });
        } else {
            viewModel.validationErrors.push('Для поиска необходимо ввести более двух символов');
            next();
        }
    });

    view.render('chlw/sermons');
}