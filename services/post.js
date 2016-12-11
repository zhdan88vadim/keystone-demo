var keystone = require('keystone');
var Tag = keystone.list('Tag');
var Post = keystone.list('Post');
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