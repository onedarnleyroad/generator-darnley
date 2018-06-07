'use strict';
const gulpLoadPlugins = require('gulp-load-plugins');
const config = require('../gulpfile.config');
const $ = gulpLoadPlugins();
const gulp = require('gulp');


module.exports = function () {

	// Copy all SVGs to craft as-is so we can embed them for animation,
	// eg a Hamburger transition.
	// 
	let destinations = config.dest.svg;
	
	let pipeline = gulp.src( config.src.svg )
		.pipe($.svgmin());

	if ( Array.isArray( destinations ) ) {
		destinations.forEach( d => {
			pipeline = pipeline.pipe(gulp.dest( d ));
		});	
	} else {
		pipeline = pipeline.pipe(gulp.dest( destinations ));
	}
		

	pipeline = gulp.src( config.src.svg )
		.pipe($.svgmin())
		.pipe($.svgSymbols({
			title: '%f icon',
			id: 'svg-%f'
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