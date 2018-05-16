'use strict';

const gulp = require('gulp');
const tailwindcss = require('tailwindcss');
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();
const path = require('path');
const config = require('./gulpfile.config');
const twConfig = require('./tailwind');


gulp.task('styles', function( done ) {

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


	// Start the pipeline:
	var pipeline = gulp.src( config.src.css )
		// Only send through changed files (speed)
		.pipe($.changed( config.dest.css ))

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
	destinations.forEach( d => {
		pipeline = pipeline.pipe(gulp.dest( d ));
	});

	// Continue the pipeline:
	pipeline = pipeline
			.pipe( $.filter( ['**/*.css'] ) )
			.pipe($.postcss([
				cssnano({
					preset: 'default',
					discardUnused: false
				})
			 ]))

			// rename with *.min extension
			.pipe($.rename({
				extname: '.min.css'
			}));

	destinations.forEach( d => {
		pipeline = pipeline.pipe(gulp.dest( d ));
	});
});