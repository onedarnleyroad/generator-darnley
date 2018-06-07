'use strict';
const juice = require('gulp-juice');
const gulpLoadPlugins = require('gulp-load-plugins');
const config = require('../gulpfile.config');
const $ = gulpLoadPlugins();
const fs = require('fs');
const gulp = require('gulp');


module.exports = function(){
	
	// first read the CSS to inject
	var extraCss = fs.readFileSync( config.emailCssFile, { encoding: 'utf8' } );

	let destinations = config.dest.email;

	let pipeline = gulp.src( config.src.email )
		.pipe($.plumber())
		.pipe(juice({
			extraCss: extraCss,
			preserveFontFaces: true,
			removeStyleTags: false,
			webResources: {
				images: false
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