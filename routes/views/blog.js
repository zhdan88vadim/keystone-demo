var keystone = require('keystone');
var async = require('async');
var Post = keystone.list('Post');
var Tag = keystone.list('Tag');
var Users = keystone.list('User');
var PostCategory = keystone.list('PostCategory');
var BaseView = require('./baseView');
var PostService = require('../../services/post');


exports.category = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    var viewModel = locals.viewModel = {};

    BaseView.addBaseActions(view, viewModel);

    // Init locals
    locals.section = 'blog category';
    locals.filters = {
        category: req.params.category,
        tag: req.params.tag,
        author: req.params.author
    };


    // Load all categories
    // view.on('init', function (next) {
    //
    // 	PostCategory.model.find().sort('name').exec(function (err, results) {
    //
    // 		if (err || !results.length) {
    // 			return next(err);
    // 		}
    //
    // 		locals.categories = results;
    //
    // 		// Load the counts for each category
    // 		async.each(locals.categories, function (category, next) {
    //
    // 			keystone.list('Post').model.count().where('state', 'published').where('categories').in([category.id]).exec(function (err, count) {
    // 				category.postCount = count;
    // 				next(err);
    // 			});
    //
    // 		}, function (err) {
    // 			next(err);
    // 		});
    //
    // 	});
    //
    // });


    // Load the current category filter
    view.on('init', function (next) {
        if (req.params.category) {
            PostCategory.model.findOne({key: locals.filters.category}).exec(function (err, result) {
                locals.category = result;
                next(err);
            });
        } else {
            next();
        }
    });

    // Load the current tag filter
    view.on('init', function (next) {
        if (req.params.tag) {
            Tag.model.findOne({key: locals.filters.tag}).exec(function (err, result) {
                locals.tag = result;
                next(err);
            });
        } else {
            next();
        }
    });

    // Load the current author
    view.on('init', function (next) {
        if (req.params.author) {

            // warning: key as string !!
            Users.model.findOne().where('key', locals.filters.author).exec(function (err, result) {
                locals.author = result;
                next(err);
            });
        } else {
            next();
        }
    });

    // Load the posts
    view.on('init', function (next) {

        var filters = {};
        if (locals.tag)
            filters.tags = locals.tag;

        if (locals.category)
            filters.categories = locals.category;

        if (locals.author)
            filters.author = locals.author;

        var q = Post.paginate({
            page: req.query.page || 1,
            perPage: 5,
            maxPages: 7,
            filters: filters
        })
            .where('state', 'published')
            .sort('-publishedDate')
            .populate('author categories tags');

        // if (locals.category) {
        // 	q.where('categories').in([locals.category]);
        // }
        // if (locals.tag) {
        // 	q.where('tags').in([locals.tag]);
        // }

        q.exec(function (err, results) {
            viewModel.items = results;
            next(err);
        });
    });

    // Render the view
    view.render('chlw/sermons');
}

