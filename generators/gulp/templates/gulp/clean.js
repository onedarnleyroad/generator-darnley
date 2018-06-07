'use strict';
const gulpLoadPlugins = require('gulp-load-plugins');
const config = require('../gulpfile.config');
const $ = gulpLoadPlugins();
const gulp = require('gulp');
const rimraf = require('rimraf'); 

var sources = [];

Object.entries( config.dest ).forEach( ([ key, dest ]) => {



	if ( Array.isArray( dest ) ) {
		dest.forEach( d => {
			sources.push( d );
		});
	} else {
		sources.push( dest );
	}

});

module.exports = function() {
	return gulp.src( sources, { read: false, allowEmpty: true } )
		.pipe( $.print.default() )
		.pipe( rimraf() );
};