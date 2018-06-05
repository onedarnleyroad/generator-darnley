'use strict';

const gulp = require('gulp');
const config = require('./gulpfile.config');


/* IMAGES --------------------------------------- */
const images = function () {

	return gulp.src( config.src.img )
		// Only send through changed files, as this is a somewhat 'heavy' operation
		.pipe($.changed( config.dest.img ))

		// need to configure this to our tastes.
		.pipe($.imagemin([
			// ??
		]))

		// save output to public
		.pipe(gulp.dest( config.dest.img ));
};
exports.images = images;

/* VENDOR --------------------------------------- */
const vendor = function() {
	
	let destinations = config.dest.vendor;

	let pipeline = gulp.src( config.src.vendor )
		.pipe($.changed( config.src.vendor ))

		// go through multiple destinations:
	if ( Array.isArray( destinations ) ) {
		destinations.forEach( d => {
			pipeline = pipeline.pipe(gulp.dest( d ));
		});	
	} else {
		pipeline = pipeline.pipe(gulp.dest( destinations ));
	}
		
	return pipeline;

};
exports.vendor = vendor;

/* STYLES --------------------------------------- */
import styles from './gulp/styles';
exports.styles = styles;

/* SCRIPTS --------------------------------------- */
const scripts = require('./gulp/scripts');
exports.scripts = scripts.compile;
exports.scriptWatcher = scripts.watcher;

/* EMAIL --------------------------------------- */
const email = require('./gulp/email');
exports.email = email;

/* SVG --------------------------------------- */
const svg = require('./gulp/svg');
exports.svg = svg;


/* BUILD --------------------------------------- */
const build = gulp.parallel( scripts.compile, styles, images, email, svg );
exports.default = build;


