

// override values with gulpfile.config.env.js
// 
// We do a deep-ish copy, we only go a 'second' level because
// that's how our config works 

const craftReadonly = './craft/templates/_readonly/';
const public 	= 'public';
const assets 	= 'assets';
const publicAssets = public + '/' + assets + '/';
const proxy	= 'https://mysite.com';
const path = require("path");

let _exports = {

	webpack: {

		scripts: [
			'inlined',
			'app',
		],

		// Will be added to scripts, eg
		// app -> ./src/js/app.js
		scriptRoot: './src/js/',

		output: {
			publicPath: '/assets/js/',
			path: path.resolve(__dirname, "public/assets/js/")
		},

		scriptDest: './public/assets/js/',

		// Template to generate webpack script tags.
		htmlTemplate: './src/webpack.html',
		htmlDestination: `${__dirname}/templates/_readonly/html/`

	},

	src: {
		// js: '{./src/js/*.js,./src/js/polyfills/*.js}',
		css: './src/scss/**/*.scss',
		email: './src/email/**/*.html',
		svg: './src/svg/**/*.svg',
    	img: './src/img/**/*.{jpg,gif,png,svg,ico}',
    	vendor: './src/vendor/**/*.{css,js,gif,eot,jpg,png,svg,otf,ttf,woff,woff2}',
	},

	// Ready by purge css in styles.
	purgecss: ['craft/templates/**/*.html'],

	dest: {	
		js:  [ publicAssets + 'js', 	craftReadonly + 'js'],
		css: [ publicAssets + 'css', 	craftReadonly + 'css'],
		svg: [ publicAssets + 'svg', 	craftReadonly + 'svg'],
		email: craftReadonly + 'email',
		img: publicAssets + 'img',
		vendor: publicAssets + 'vendor',
		preload: craftReadonly + 'html/preload.html',
		tailwindReport: craftReadonly + 'html/tailwind-report.html'
	},

	emailCssFile: craftReadonly + 'css/email-inline.css',


	browserSync: {
    	proxy: proxy,

    	// JS and HTML hammer refreshes if you have
    	// lots of tabs open, I prefer that to be a
    	// manual process
    	files: './public/assets/css/*.css',

		ghostMode: {
			scroll: false,
			clicks: false
		},

		// don't notify - it lingers too long and gets in the way of the design!
		notify: false,

		// don't automatically open a browser - usually I might start or stop gulp,
		// so I don't want to have to keep opening and closing tabs.
		open: false,

		// rewrite any webpack files to the port on the webpack dev server.
		rewriteRules: [{
			// eg /assets/js/app.js becomes https://localhost:9000/assets/js/app.js
			match: /\/assets\/js\/(.+)\.js/g,
			// match: 'Loading',
			fn: (req, res, match) => {
				return `https://localhost:9000${match}`;
			}

		}],

		// Avoid CORS issues on Craft CMS:
		middleware: function (req, res, next) {
			res.setHeader('Access-Control-Allow-Origin', '*');
			next();
		},
    },

};


const optionalRequire = require("optional-require")(require);
const envConfig = optionalRequire("./gulpfile.config.env.js") || {};

Object.entries( _exports ).forEach( ( [key, value] ) => { 

	if ( envConfig.hasOwnProperty( key ) ) {

		let envConfigSetting = envConfig[ key ];

		if ( typeof envConfigSetting === 'object' )

		Object.entries( envConfigSetting ).forEach( ( [envKey, envValue] ) => { 
			_exports[ key ][ envKey ] = envValue;
		});
	}

});


module.exports = _exports;