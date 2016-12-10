var keystone = require('keystone');
var ImageConverting = require('../services/image-converting');

var Types = keystone.Field.Types;

var Post = new keystone.List('Post', {
    autokey: {from: 'name', path: 'key', unique: true},
});

var myStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        path: keystone.expandPath('./public/uploads/posts/img'), // required; path where the files should be stored
        publicPath: './public/uploads/posts/img' // path where files will be served
    }
});

Post.add({
    name: {type: String, required: true},
    state: {type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true},
    author: {type: Types.Relationship, ref: 'User', index: true},
    publishedDate: {type: Types.Date, index: true},
    image: {
        type: Types.File, storage: myStorage
    },
    content: {
        brief: {type: Types.Html, wysiwyg: true, height: 150},
        extended: {type: Types.Html, wysiwyg: true, height: 400},
    },
    categories: {type: Types.Relationship, ref: 'PostCategory', many: true},
    tags: {type: Types.Relationship, ref: 'Tag', many: true},
});

Post.schema.virtual('content.full').get(function () {
    return this.content.extended || this.content.brief;
});

Post.relationship({path: 'comments', ref: 'PostComment', refPath: 'post'});





// You can specify virtuals, methods, statics as well as pre and post hooks for your Lists using the schema.
// You can also use mongoose plugins from the plugins website.
//
// http://keystonejs.com/docs/database/#lists-plugins
// http://mongoosejs.com/docs/middleware.html


Post.schema.post('save', function(next) {
    //var nextFn = next;

    console.log('post save');

    var filename = './public/uploads/posts/img/' + this.image.filename
    var outputDir = './public/uploads/posts/img/preview/' + this.image.filename;

    ImageConverting.createPreviewImage(filename, outputDir, function() {
        //nextFn();
    });

});


Post.track = true;
Post.defaultColumns = 'name, state|20%, author|20%, publishedDate|20%';
Post.register();
