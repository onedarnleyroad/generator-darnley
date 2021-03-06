'use strict';
const twConfig = require('../tailwind');
const gulpLoadPlugins = require('gulp-load-plugins');
const config = require('../gulpfile.config');
const $ = gulpLoadPlugins();
const tailwindcss = require('tailwindcss');
const cssnano = require("cssnano");
const gulp = require('gulp');

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g);
  }
}

module.exports = function( done ) {


	var sassVars = {
		fontDefs: twConfig.fontPaths
	};

	// prepare colours:
	for ( var property in twConfig.colors ) {

		let color = twConfig.colors[ property ];

		sassVars[ property ] = color;

	}

	// config.dest.css should now be an array eg:
	// [ './public/css', './craft/templates/_readonly' ]
	// as the pipeline can be split up, and gulp.dest added
	// programmatically.
	let destinations = config.dest.css;

	let changeCheck = Array.isArray( destinations ) ? destinations[0] : destinations;

	// Start the pipeline:
	var pipeline = gulp.src( config.src.css )
		// Only send through changed files (speed)
		.pipe($.changed( changeCheck ))

		// handle errors without having entire task fail
		.pipe($.plumber())

		// sourcemaps
		.pipe($.sourcemaps.init())

		.pipe($.sassVars(sassVars, { verbose: false }))

		// post process sass
		.pipe($.sass().on('error', $.sass.logError))

		// postprocess vendor prefixes
		.pipe($.autoprefixer({
			browsers: [
				'last 2 versions',
				'ie 9'
			]
		}))

		.pipe($.postcss([
			tailwindcss('./tailwind.js'),
		]))

		.on('error', done)

		// write sourcemaps to a subfolder
		.pipe($.sourcemaps.write('maps'));


	// go through multiple destinations:
	if ( Array.isArray( destinations ) ) {
		destinations.forEach( d => {
			pipeline = pipeline.pipe(gulp.dest( d ));
		});	
	} else {
		pipeline = pipeline.pipe(gulp.dest( destinations ));
	}

	// Continue the pipeline:
	pipeline = pipeline
			.pipe( $.filter( ['**/*.css'] ) )
			.pipe($.postcss([
				cssnano({
					preset: 'default',
					discardUnused: false
				})
			 ]))

			.pipe( $.purgecss({
				content: config.purgecss,
				extractors: [{
					extractor: TailwindExtractor,
					extensions: ["html"]
				}]
			}) )

			// rename with *.min extension
			.pipe($.rename({
				extname: '.min.css'
			}));

	if ( Array.isArray( destinations ) ) {
		destinations.forEach( d => {
			pipeline = pipeline.pipe(gulp.dest( d ));
		});	
	} else {
		pipeline = pipeline.pipe(gulp.dest( destinations ));
	}

	return pipeline;
};