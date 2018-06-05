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
const styles = require('./gulp/styles');
gulp.task('styles', styles.compile );

/* SCRIPTS --------------------------------------- */
const scripts = require('./gulp/scripts');
gulp.task('scripts', scripts.compile );

/* EMAIL --------------------------------------- */
const email = require('./gulp/email');
gulp.task('email', email );

/* SVG --------------------------------------- */
const svg = require('./gulp/svg');
exports.svg = svg;


/* SERVE --------------------------------------- */
// Launch browser sync
const serve = function() {
		
	scripts.watcher();

	clearModule('./tailwind.js');

	

	gulp.watch( config.src.css, 
		gulp.series( styles.refresh, 'styles' )
	);

	gulp.watch( config.src.svg, gulp.parallel('svg') );
		
	browserSync( config.browserSync );

};





/* BUILD --------------------------------------- */
// const build = gulp.parallel( scripts.compile, styles.compile, images, email, svg );
// exports.default = build;


