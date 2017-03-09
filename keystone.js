var keystone = require('keystone');

keystone.init({

	'name': 'Церковь Свет Миру - Минск',
	'brand': 'chlw',
	'google_reCaptcha': process.env.GOOGLE_RECAPTCHA || '6Les1RcUAAAAAHzLl_5FHeCJgNl8zOr8vtNhefej',
	'favicon': 'public/favicon.ico',
	'less': 'public',
	'static': 'public',

	'views': 'templates/views',
	'view engine': 'pug',

	'auto update': true,
	'mongo': process.env.MONGO_URI || process.env.MONGOLAB_URI || 'mongodb://localhost/keystone-zhv-site',	
	'cloudinary config': 'cloudinary://333779167276662:_8jbSi9FB3sWYrfimcl8VKh34rI@keystone-demo',

	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': process.env.COOKIE_SECRET || 'demo',

	'ga property': process.env.GA_PROPERTY,
	'ga domain': process.env.GA_DOMAIN,

	'chartbeat property': process.env.CHARTBEAT_PROPERTY,
	'chartbeat domain': process.env.CHARTBEAT_DOMAIN,

	// http://stackoverflow.com/questions/13841986/tinymce-adding-p-tags-automatically
	// http://keystonejs.com/docs/configuration/#options-ui
	'wysiwyg additional options': {
 		force_br_newlines : false,
		force_p_newlines : false,
		forced_root_block : '',
	}

});

keystone.import('models');

keystone.set('locals', {
	_: require('lodash'),
	siteUtils: require('./utils/siteUtils'),
	siteConst: require('./utils/constants'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
	ga_property: keystone.get('ga property'),
	ga_domain: keystone.get('ga domain'),
	chartbeat_property: keystone.get('chartbeat property'),
	chartbeat_domain: keystone.get('chartbeat domain')
});

keystone.set('routes', require('./routes'));

keystone.set('nav', {
	'posts': ['posts', 'post-comments', 'post-categories', 'tags'],
	'tags':'tags',
	'galleries': 'galleries',
	'enquiries': 'enquiries',
	'users': 'users',
	'field-tests': 'things'
});

keystone.start();
