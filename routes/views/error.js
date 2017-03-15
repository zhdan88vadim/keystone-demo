var keystone = require('keystone');
var request = require('request');

var Post = keystone.list('Post');
var PostComment = keystone.list('PostComment');
var BaseView = require('./baseView');


exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    var viewModel = locals.viewModel = {};

    view.render('chlw/errors/404');
}