var keystone = require('keystone');
var Tag = keystone.list('Tag');


exports.getAll = function(callback) {

    Tag.model.find().exec(function (err, results) {
        if (err) {
            callback(err);
        } else {
            callback(null, results);
        }
    });

}