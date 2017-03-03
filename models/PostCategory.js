var keystone = require('keystone');
var Types = keystone.Field.Types;

var PostCategory = new keystone.List('PostCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Categories',
});

PostCategory.add({
	name: { type: String, required: true },
	title: { type: String, required: true, initial: true },
    showOnPage: { type: Boolean, required: true, default: true },
	importRef: { type: String, hidden: true }
});

PostCategory.relationship({ ref: 'Post', refPath: 'categories' });

PostCategory.track = true;
PostCategory.register();
