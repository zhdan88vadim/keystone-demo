var keystone = require('keystone');
var request = require('request');

var Post = keystone.list('Post');
var PostComment = keystone.list('PostComment');
var BaseView = require('./baseView');


exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    var viewModel = locals.viewModel = {};
    viewModel.validationErrors = []

    BaseView.addBaseActions(view, viewModel);

    locals.filters = {
        post: req.params.post,
    };

    // Load the current post
    view.on('init', function (next) {

        var q = Post.model.findOne({
            state: 'published',
            key: locals.filters.post,
        }).populate('author categories');

        q.exec(function (err, result) {

            if (result || err) {
                viewModel.post = result;
                next(err);
            } else {
                return res.redirect('/error/404');
            }
        });
    });

    // Load other posts
    view.on('init', function (next) {

        var q = Post.model.find()
            .where('state', 'published')
            .sort('-publishedDate')
            .populate('author').limit(4);

        q.exec(function (err, results) {
            viewModel.relatedPosts = results;
            next(err);
        });

    });


    // Load comments on the Post
    view.on('init', function (next) {
        PostComment.model.find()
            .where('post', viewModel.post)
            .where('commentState', 'published')
            //.where('author').ne(null)
            .populate('author', 'name photo')
            .sort('-publishedOn')
            .exec(function (err, comments) {
                if (err) return res.err(err);
                if (!comments) return res.notfound('Post comments not found');
                viewModel.comments = comments;
                next();
            });
    });

    // view.on(true, function (next) {
    //     console.log('all!');
    //     next();
    // });

    view.on('get', function (next) {
        //console.log('GOT!');
        next();
    });

    view.on('post', function (next) {
        //console.log('post!');
        next();
    });


    // Create a Comment
    view.on('post', {action: 'comment.create'}, function (next) { //{action: 'comment.create'},

        function verifyReCaptcha() {

            // https://www.google.com/recaptcha/
            // https://codeforgeek.com/2016/03/google-recaptcha-node-js-tutorial/

            if(req.body['g-recaptcha-response'] === undefined
                || req.body['g-recaptcha-response'] === ''
                || req.body['g-recaptcha-response'] === null) {
                viewModel.validationErrors.push('Пожалуйста заполните капчу');
                next();

            } else {

                var secretKey = keystone.get('google_reCaptcha');
                var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey
                    + "&response=" + req.body['g-recaptcha-response']
                    + "&remoteip=" + req.connection.remoteAddress;

                request(verificationUrl,function(error,response, body) {
                    body = JSON.parse(body);
                    // Success will be true or false depending upon captcha validation.
                    if(body.success !== undefined && !body.success) {
                        viewModel.validationErrors.push('Капча не прошла валидацию');
                    } else {
                        addComment();
                    }
                });
            }
        }

        function addComment() {

            var newComment = new PostComment.model({
                state: 'published',
                post: viewModel.post.id,
                author: null,
                authorAnonymName: req.body.username
            });

            var updater = newComment.getUpdateHandler(req);

            updater.process(req.body, {
                fields: 'content',
                flashErrors: true,
                logErrors: true,
            }, function (err) {
                if (err) {
                    viewModel.validationErrors = err.errors;
                } else {
                    req.flash('success', 'Your comment was added.');
                    return res.redirect('/blog/post/' + viewModel.post.key + '#comment-id-' + newComment.id);
                }
                next();
            });
        }

        addComment();

    });


    // Delete a Comment
    view.on('get', {remove: 'comment'}, function (next) {

        if (!req.user) {
            req.flash('error', 'You must be signed in to delete a comment.');
            return next();
        }

        PostComment.model.findOne({
            _id: req.query.comment,
            post: locals.post.id,
        })
            .exec(function (err, comment) {
                if (err) {
                    if (err.name === 'CastError') {
                        req.flash('error', 'The comment ' + req.query.comment + ' could not be found.');
                        return next();
                    }
                    return res.err(err);
                }
                if (!comment) {
                    req.flash('error', 'The comment ' + req.query.comment + ' could not be found.');
                    return next();
                }
                if (comment.author != req.user.id) {
                    req.flash('error', 'Sorry, you must be the author of a comment to delete it.');
                    return next();
                }
                comment.commentState = 'archived';
                comment.save(function (err) {
                    if (err) return res.err(err);
                    req.flash('success', 'Your comment has been deleted.');
                    return res.redirect('/blog/post/' + locals.post.key);
                });
            });
    });

    // Render the view
    view.render('chlw/article');
}