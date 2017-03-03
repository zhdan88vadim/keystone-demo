var keystone = require('keystone');
var Types = keystone.Field.Types;

var Tag = new keystone.List('Tag', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Tags',
});

Tag.add({
	name: { type: String, required: true },
	importRef: { type: String, hidden: true }
});

Tag.relationship({ ref: 'Post', refPath: 'tags' });

Tag.track = true;
Tag.register();
