var keystone = require('keystone');
var Types = keystone.Field.Types;

var myStorage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: keystone.expandPath('./public/uploads/users/img'), // required; path where the files should be stored
		publicPath: './public/uploads/users/img' // path where files will be served
	}
});


var User = new keystone.List('User', {
	// nodelete prevents people deleting the demo admin user
	nodelete: true,
	autokey: { from: 'name', path: 'key', unique: true }
});


//TODO: allowedTypes: ['jpg', 'png', 'jpg', 'gif'], for image

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true, unique: true },
	phone: { type: String, width: 'short' },
	showOnPage: { type: Boolean, required: true, default: true },
	photo: { type: Types.File, storage: myStorage, collapse: true },
	password: { type: Types.Password, initial: true, required: false },
}, 'Permissions', {
	isProtected: { type: Boolean, noedit: true },
	importRef: { type: String, hidden: true }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return true;
});

User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });

User.schema.methods.wasActive = function () {
	this.lastActiveOn = new Date();
	return this;
}

/**
 * DEMO USER PROTECTION
 * The following code prevents anyone updating the default admin user
 * and breaking access to the demo
 */

function protect (path) {
	User.schema.path(path).set(function (value) {
		return (this.isProtected && this.get(path)) ? this.get(path) : value;
	});
}

['name.first', 'name.last', 'email', 'password', 'isProtected'].forEach(protect);

/**
 * END DEMO USER PROTECTION
 */

User.track = true;
User.defaultColumns = 'name, email, phone, photo, showOnPage';
User.register();
