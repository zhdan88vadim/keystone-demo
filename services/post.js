var keystone = require('keystone');
var Tag = keystone.list('Tag');
var Post = keystone.list('Post');
var Users = keystone.list('User');
var PostCategory = keystone.list('PostCategory');


exports.getAll = function(callback) {

    Tag.model.find().exec(function (err, results) {
        if (err) {
            callback(err);
        } else {
            callback(null, results);
        }
    });

}


/**
 * Get PostList by Tag
 */
exports.getPostListByAuthorKey = function (name, callback) {
    Users.model.findOne().where('key', name).exec(function (err, item) {

        if (err) return callback('database error');
        if (!item) return callback('not found');

        var author = item;

        Post.model.find().populate('author categories').where('author').in([author.id]).exec(function (err, items) {
            if (err) return callback('database error', err);
            if (!items || items.length === 0) return callback('not found');

            callback(null, items);
        });
    });
};


/**
 * Get PostList by Tag
 */
exports.getPostListByTagKey = function (name, callback) {
    Tag.model.findOne().where('key', name).exec(function (err, item) {

        if (err) return callback('database error');
        if (!item) return callback('not found');

        var tag = item;

        Post.model.find().populate('author categories').where('tags').in([tag.id]).exec(function (err, items) {
            if (err) return callback('database error', err);
            if (!items || items.length === 0) return callback('not found');

            callback(null, items);
        });
    });
};

/**
 * Get PostList by CategoryKey
 */
exports.getPostListByCategoryKey = function (categoryKey, callback) {
    PostCategory.model.findOne().where('key', categoryKey).exec(function (err, item) {

        if (err) return callback('database error');
        if (!item) return callback('not found');

        var category = item;

        Post.model.find().populate('author categories').where('categories').in([category.id]).exec(function (err, items) {
            if (err) return callback('database error', err);
            if (!items || items.length === 0) return callback('not found');

            callback(null, items);
        });
    });
};


/**
 * Get PostList for Index Page
 */
exports.getPostListForIndexPage = function (callback) {

    var q = Post.paginate({
        page: 1,   //req.query.page || 1,
        perPage: 10,
        maxPages: 10,
    })
        .where('state', 'published')
        .sort('-publishedDate')
        .populate('author categories tags');

    // if (locals.category) {
    //     q.where('categories').in([locals.category]);
    // }
    // if (locals.tag) {
    //     q.where('tags').in([locals.tag]);
    // }

    q.exec(function (err, results) {
        if (err) return callback('database error', err);
        callback(null, results);
    });
};