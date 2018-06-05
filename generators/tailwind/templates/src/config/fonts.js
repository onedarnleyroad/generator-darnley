

/*

	
*/


// replace with whatever your main font face is:
let mainSansFont = "sans-serif";
let mainSerifFont = "serif";


// All families have these extensions:
const extensions = {
	// [ fileextension, format ]
	'eot': 'embedded-opentype',
	'woff2': 'woff2',
	'woff': 'woff',
	'svg': 'svg',
	'ttf': 'truetype'
};

// Public file path:
const fontPath = '/assets/vendor/webfonts/';

// In use - add as appropriate

var families = [
	// EG: build fonts, set the font weights, set the filename and so on. Can be used with our font face observer.
	// { name:'greycliff', filename: 'greycliff-cf-extra-bold', weight: '800', style: 'normal' },

];

var fontPaths = [];

// Build full filepaths for each font file-type:
families.forEach( family => {

	// THE ORDER IN THIS OBJECT IS VERY IMPORTANT!
	// Due to Sass maps being a bit more index based rather than keyname,
	// so don't change it.
	var thisPath = {
		name: family.name,
		weight: family.weight,
		style: family.style,
		srcs: []
	};

	family.extensions.forEach( _extension => {

		thisPath.srcs.push({
			url: fontPath + family.filename + '.' + _extension,
			format: extensions[ _extension ]
		});
	});

	fontPaths.push( thisPath );

});



module.exports = {

	// Font face paths, and definitions.
	// Not used by Tailwind, but used for our fontfaceloader
	// and for our @font-face definitions:
	// /src/js/fonts.js and ./src/scss/fonts.scss
	fontPaths: fontPaths,

	// TAILWIND
	fontFaces: {

		'pre-sans': [
			'-apple-system',
			'BlinkMacSystemFont',
			'Segoe UI',
			'Roboto',
			'Oxygen',
			'Ubuntu',
			'Cantarell',
			'Fira Sans',
			'Droid Sans',
			'Helvetica Neue',
			'sans-serif',
		],

		'sans': [
			mainSansFont,
			'-apple-system',
			'BlinkMacSystemFont',
			'Segoe UI',
			'Roboto',
			'Oxygen',
			'Ubuntu',
			'Cantarell',
			'Fira Sans',
			'Droid Sans',
			'Helvetica Neue',
			'sans-serif',
		],

		'pre-serif': [
			// 'Georgia',
			'Constantia',
			'Lucida Bright',
			'Lucidabright',
			'Lucida Serif',
			'Lucida',
			'DejaVu Serif',
			'Bitstream Vera Serif',
			'Liberation Serif',
			'serif',
		],

		'serif': [
			mainSerifFont,
			'Constantia',
			'Lucida Bright',
			'Lucidabright',
			'Lucida Serif',
			'Lucida',
			'DejaVu Serif',
			'Bitstream Vera Serif',
			'Liberation Serif',
			'Georgia',
			'serif',
		],


		'mono': [
			'Menlo',
			'Monaco',
			'Consolas',
			'Liberation Mono',
			'Courier New',
			'monospace',
		]
	}
}
