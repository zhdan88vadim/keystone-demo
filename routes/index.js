const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

keystone.pre('routes', function(req, res, next) {  
    res.locals.loginUser = req.user;
    res.locals.loginUser = {name: 'Fake User', canAccessKeystone: true};
        
    next();
});

keystone.pre('render', middleware.theme);
keystone.pre('render', middleware.flashMessages);

keystone.set('404', function(req, res, next) {
    res.status(404).render('chlw/errors/404');
});

// Load Routes
var routes = {
    download: importRoutes('./download'),
    //api: importRoutes('./api'),
    views: importRoutes('./views'),
};

exports = module.exports = function(app) {

    app.all(middleware.theme);

    // Views
    app.all('/', routes.views.index);

    app.get('/blog/tag/:tag', routes.views.blog.category);
    app.get('/blog/author/:author', routes.views.blog.category);
    app.get('/blog/category/:category', routes.views.blog.category);

    app.all('/blog/post/:post', routes.views.post); // ?

    app.all('/gallery/update', routes.views.gallery.update);
    app.get('/gallery/:album', routes.views.gallery.album);
    app.get('/gallery', routes.views.gallery.list);


    app.all('/search', routes.views.search);
    app.all('/error/:error', routes.views.error);
    app.all('/contact', routes.views.contact);

    // Downloads
    app.get('/download/users', routes.download.users);
}


// app.post('/blog/post/:post', function(req, res, next) {
//     console.log('blog/post/my')
//     routes.views.post(req, res);
//     //next();
//
// });

// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
// app.get('/protected', middleware.requireUser, routes.views.protected);

// app.all('/api*', keystone.initCORS);


// app.get('/api/post/list', [keystone.middleware.api, keystone.middleware.cors], routes.api.posts.list);
// app.all('/api/post/create', [keystone.middleware.api, keystone.middleware.cors], routes.api.posts.create);
// app.get('/api/post/:slug', [keystone.middleware.api, keystone.middleware.cors], routes.api.posts.get);
// app.all('/api/post/:id/update', [keystone.middleware.api, keystone.middleware.cors], routes.api.posts.update);
// app.get('/api/post/:id/remove', [keystone.middleware.api, keystone.middleware.cors], routes.api.posts.remove);
//
// app.get('/api/post-category/list', [keystone.middleware.api, keystone.middleware.cors], routes.api.post_categories.list);
// app.get('/api/post-category/:key', [keystone.middleware.api, keystone.middleware.cors], routes.api.post_categories.get);
//
// app.get('/api/post-by-category/:key', [keystone.middleware.api, keystone.middleware.cors], routes.api.post_by_category.list);
//
// app.get('/api/gallery/list', [keystone.middleware.api, keystone.middleware.cors], routes.api.galleries.list);
// app.get('/api/gallery/:key', [keystone.middleware.api, keystone.middleware.cors], routes.api.galleries.get);
//
// app.get('/api/enquiry/list', [keystone.middleware.api, keystone.middleware.cors], routes.api.enquiries.list);
// app.all('/api/enquiry/create', [keystone.middleware.api, keystone.middleware.cors], routes.api.enquiries.create);
// app.all('/api/enquiry/:id/update', [keystone.middleware.api, keystone.middleware.cors], routes.api.enquiries.update);
// app.get('/api/enquiry/:id/remove', [keystone.middleware.api, keystone.middleware.cors], routes.api.enquiries.remove);
//
// app.get('/api/enquiry_type/list', [keystone.middleware.api, keystone.middleware.cors], routes.api.enquiry_types.list);
// app.get('/api/enquiry_type/:value', [keystone.middleware.api, keystone.middleware.cors], routes.api.enquiry_types.get);
