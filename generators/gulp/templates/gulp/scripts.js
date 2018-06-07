'use strict';
const twConfig = require('../tailwind');
const browserify = require("browserify");
const gulpLoadPlugins = require('gulp-load-plugins');
const config = require('../gulpfile.config');
const $ = gulpLoadPlugins();
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const watchify = require('watchify');

// Given an entry point, create a browserify instance,
// set up our transforms etc
const createBrowserifyInstance = function( entry ) {
	return browserify( entry, {
				debug: true,
				paths: [
					"./src",
					"./src/js"
				]
			})
			.transform('browserify-shim')
			.transform('babelify', {
				plugins: ["transform-es2015-classes"],
				presets: ['env', 'es2015'],
				global: true
			}, { loose: true });
};

// after a bundle this processes things after, eg minify,
// source maps, pipe to destination.
const createBundle = function( watcher, entry, reject ) {
	let destinations = config.dest.js;

	let pipeline = watcher
			.bundle()
			.on('error', function (error) {
				console.log('error:', error.message );
				if ( reject ) {
					reject();
				}
				this.emit('end');
			})
			.pipe( source( entry ) )
			.pipe(buffer())

			.pipe( $.rename({
				dirname: '' // glob returns full path
			}) );


		if ( Array.isArray( destinations ) ) {
			destinations.forEach( d => {
				pipeline = pipeline.pipe(gulp.dest( d ));
			});	
		} else {
			pipeline = pipeline.pipe(gulp.dest( destinations ));
		}

		pipeline = pipeline
				.pipe( $.rename({
					extname: '.min.js'
				}) )
				.pipe( $.babelMinify({
					mangle: {
						keepClassName: true
					}
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


// Create a watcher from an entry point
const createWatcher = function( entry ) {

	console.log("Watcher for " + entry );

	var dest = config.dest.js;
	var craftDest = config.dest.jsCraft;

	/*==========================================
	=            SPECIFIC EXCEPTION            =

		sw.js needs to go in public root,
		as it is our service worker to
		register for the site and can't be
		in an asset folder. 				  */

	if ( entry.substring( entry.length - 5 ) === 'sw.js' ) {
		console.log("Exception for file: - loading to new dest: ", entry.substring( entry.length - 5 ) );
		dest = publicFolder;
	}

	/*========================================*/

	var watcher = watchify( createBrowserifyInstance( entry ) );

	var bundle = function() {
		return createBundle( watcher, entry, dest, craftDest);
	}

	var timer;

	var update = function() {
		var updateStart = Date.now();

		clearInterval( timer );
		console.log("-----------------");
		var dots = 'Compiling ' + entry + '.';
		process.stdout.write(dots);
		timer = setInterval( function() {
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			dots = dots + '.'
			process.stdout.write(dots);
		}, 50 );

		bundle()
			.on('end', function () {
				clearInterval( timer );
				process.stdout.write("\n"); // end the line
				console.log('Compiled ' + dest + '/' + entry, (Date.now() - updateStart) + 'ms');
				console.log("-----------------");
			});
	};

	watcher.on('update', update);

	return bundle();

};


const glob = require("glob");

const compile = function( done ) {
	

 	const compileEntry = function( entry ) {

		return new Promise(function (resolve, reject) {

			var updateStart = Date.now();

			console.log('Compiling ' + entry);

			var bs = createBrowserifyInstance( entry );

			let pipeline = createBundle( bs, entry, reject )
				.on('end', function () {
					console.log('Compiled ' + entry, (Date.now() - updateStart) + 'ms');
					resolve();
				});
		});
	};

	var tasks = [];

	glob( config.src.js, function( err, files ) {
		if (err) done(err);
		files.forEach( f => {
			tasks.push( compileEntry( f ) );
		});
	});

	
	return new Promise(function (resolve, reject) {
		Promise.all( tasks ).then( () => {
			resolve();
		});
	});	

	
};

const watcher = function() {

	glob( config.src.js , function( err, files ) {
		if(err) done(err);
		var tasks = files.map( createWatcher );
	});
	
};

exports.compile = compile;
exports.watcher = watcher;
	