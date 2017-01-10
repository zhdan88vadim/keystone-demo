var keystone = require('keystone');
var async = require('async');
var Post = keystone.list('Post');
var Tag = keystone.list('Tag');
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
	};
	locals.items = [];
	locals.categories = [];

	// Load all categories
	view.on('init', function (next) {

		PostCategory.model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.categories = results;

			// Load the counts for each category
			async.each(locals.categories, function (category, next) {

				keystone.list('Post').model.count().where('state', 'published').where('categories').in([category.id]).exec(function (err, count) {
					category.postCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});

		});

	});

	// Load the current category filter
	view.on('init', function (next) {
		if (req.params.category) {
			PostCategory.model.findOne({ key: locals.filters.category }).exec(function (err, result) {
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
			Tag.model.findOne({ key: locals.filters.tag }).exec(function (err, result) {
				locals.tag = result;
				next(err);
			});
		} else {
			next();
		}
	});

	// Load the posts
	view.on('init', function (next) {

		var q = Post.paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
		})
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author categories tags');

		if (locals.category) {
			q.where('categories').in([locals.category]);
		}
		if (locals.tag) {
			q.where('tags').in([locals.tag]);
		}

		q.exec(function (err, results) {
			locals.items = results;
			next(err);
		});

	});

	// Render the view
	view.render('chlw/sermons');

}


exports.tag = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'blog tag';
	locals.filters = {
		tag: req.params.tag,
	};
	locals.posts = {};
	locals.categories = [];

	// Load all categories
	view.on('init', function (next) {

		PostService.getPostListByTagKey(locals.filters.tag, function(err, results) {
			locals.posts.results = results;
			next(err);
		});
	});


	// Render the view
	view.render('blog');
}

exports.author = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'blog author';
	locals.filters = {
		author: req.params.author,
	};
	locals.posts = {};
	locals.categories = [];

	// Load all categories
	view.on('init', function (next) {

		PostService.getPostListByAuthorKey(locals.filters.author, function(err, results) {
			locals.posts.results = results;
			next(err);
		});
	});


	// Render the view
	view.render('blog');
}

