'use strict';

const gulp = require('gulp');
const config = require('./gulpfile.config');
const browserSync = require('browser-sync');
const gulpLoadPlugins = require('gulp-load-plugins');

const $ = gulpLoadPlugins();

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
gulp.task('images', images );

/* VENDOR --------------------------------------- */
const vendor = function() {
	
	let destinations = config.dest.vendor;

	let pipeline = gulp.src( config.src.vendor )
		.pipe($.changed( config.src.vendor ));

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
gulp.task('vendor', vendor );

/* STYLES --------------------------------------- */
const styles = require('./gulp/styles');
gulp.task('styles', styles );


/* Preload tags ----------------------------------- */
const preloadTags = require('./gulp/preload-tags');
gulp.task('preload-tags', preloadTags );

/* SCRIPTS --------------------------------------- */
const scripts = require('./gulp/scripts');
gulp.task('scripts', scripts.compile );

/* EMAIL --------------------------------------- */
const email = require('./gulp/email');
gulp.task('email', gulp.series( 'styles', email ) );

/* SVG --------------------------------------- */
const svg = require('./gulp/svg');
gulp.task('svg', svg );

/* CLEAN --------------------------------------- */
const clean = require('./gulp/clean');
gulp.task('clean', clean );

/* SERVE --------------------------------------- */
// Launch browser sync


var spawn = require('child_process').spawn;

const serve = function() {
		
	scripts.watcher();
	

	function refresh() {

		var child = spawn('gulp', ['styles', '--color'], { stdio: 'pipe' });
		child.stdout.pipe(process.stdout);
	}

	gulp.watch( config.src.css, refresh );

	gulp.watch( config.src.svg, gulp.parallel('svg') );
		
	browserSync( config.browserSync );

};

gulp.task('serve', serve );



/* BUILD --------------------------------------- */
const build = gulp.parallel( 'preload-tags', 'scripts', 'styles', 'images', 'email', 'svg', 'vendor' );
gulp.task('default', build );

gulp.task( 'rebuild', gulp.series( clean, build ) );


