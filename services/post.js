var keystone = require('keystone');
var Tag = keystone.list('Tag');
var Post = keystone.list('Post');
var Users = keystone.list('User');
var PostCategory = keystone.list('PostCategory');


exports.getAll = function (callback) {

    Tag.model.find().exec(function (err, results) {
        if (err) {
            callback(err);
        } else {
            callback(null, results);
        }
    });

}

exports.getAllCategories = function (callback) {

    PostCategory.model.find({showOnPage: true}).exec(function (err, results) {
        if (err) {
            callback(err);
        } else {
            callback(null, results);
        }
    });
}


/**
 * Get PostList for Index Page
 */
exports.getPostListForIndexPage = function (pageNumber, callback) {

    var q = Post.paginate({
        page: pageNumber || 1,
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