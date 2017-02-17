var keystone = require('keystone');
var User = keystone.list('User');


exports.getAll = function (callback) {

    User.model.find({showOnPage: true}).exec(function (err, results) {
        if (err) {
            callback(err);
        } else {
            callback(null, results);
        }
    });

}