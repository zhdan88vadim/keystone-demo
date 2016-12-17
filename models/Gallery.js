var keystone = require('keystone');
var Types = keystone.Field.Types;

var mongoose = keystone.mongoose;

var myStorage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: keystone.expandPath('./public/uploads/gallery/img'), // required; path where the files should be stored
		publicPath: '/public/uploads/gallery/img' // path where files will be served
	}
});

var Gallery = new keystone.List('Gallery', {
	autokey: { from: 'name', path: 'key', unique: true },
	plural: 'Albums',
	singular: 'Album',
});

Gallery.add({
	name: { type: String, required: true },
	publishedDate: { type: Types.Date, default: Date.now },
	images: { type: Types.File, storage: myStorage },
	stringArray: { type: Types.TextArray }
});

var UploadFileListSchema = new mongoose.Schema({ filename: 'string' });

Gallery.schema.add({
	uploadFiles: [UploadFileListSchema]
});

Gallery.track = true;
Gallery.defaultSort = 'name';
Gallery.defaultColumns = 'name, publishedDate';
Gallery.register();
