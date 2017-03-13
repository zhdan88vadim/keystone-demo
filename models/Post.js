var keystone = require('keystone');
var ImageConverting = require('../services/image-converting');

const postFileDir = './public/uploads/posts/files/';
const postImgDir = './public/uploads/posts/img/';
var postPreviewImgDir = postImgDir + '/preview/';

var Types = keystone.Field.Types;

var Post = new keystone.List('Post', {
    autokey: {from: 'name', path: 'key', unique: true},
});

var ImageStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    schema: {
        originalname: true
    },
    fs: {
        path: keystone.expandPath(postImgDir), // required; path where the files should be stored
        publicPath: postImgDir // path where files will be served
    }
});

// Add Option for Generated Filenames
//https://github.com/keystonejs/keystone-storage-adapter-s3/pull/12/commits/9db761ae0d138d02b7b7c59fa7e59f761f5b95e8
//https://github.com/keystonejs/keystone-storage-adapter-azure

var FileStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    schema: {
        originalname: true
    },
    fs: {
        generateFilename: function(file, i, callback) {
             return callback(null, file.size + '_' + file.originalname);
        },
        path: keystone.expandPath(postFileDir), // required; path where the files should be stored
        publicPath: postFileDir // path where files will be served
    }
});

Post.add({
    name: {type: String, required: true},
    state: {type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true},
    author: {type: Types.Relationship, ref: 'User', index: true},
    publishedDate: {type: Types.Date, index: true},
    content: {
        brief: {type: Types.Html, wysiwyg: true, height: 150},
        extended: {type: Types.Html, wysiwyg: true, height: 400},
    },
    image: {
        type: Types.File, storage: ImageStorage
    },

    file0: {
        type: Types.File, storage: FileStorage
    },
    file1: {
        type: Types.File, storage: FileStorage
    },
    file2: {
        type: Types.File, storage: FileStorage
    },
    file3: {
        type: Types.File, storage: FileStorage
    },

    urls: { type: Types.TextArray },
    urlsPodfm: { type: Types.TextArray },
    categories: {type: Types.Relationship, ref: 'PostCategory', many: true},
    tags: {type: Types.Relationship, ref: 'Tag', many: true},
    hits: {type: Types.Number, default: 0, readonly: true},
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

    var filename = postImgDir + this.image.filename
    var outputDir = postPreviewImgDir + this.image.filename;

    ImageConverting.createPreviewImage(filename, outputDir, function() {
        //nextFn();
    });

});


Post.track = true;
Post.defaultColumns = 'name, state|20%, author|20%, publishedDate|20%';
Post.register();
