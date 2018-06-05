'use strict';

import FontFaceObserver from 'fontfaceobserver';
import { fontPaths } from "config/fonts";

var timeoutSeconds = 15,
	timeout = timeoutSeconds * 1000;

var loaders = [];

fontPaths.forEach( function( font ) {

	var prom = new FontFaceObserver( font.name , { weight: font.weight, style: font.style });
	var promLoad = prom.load(null, timeout);

	loaders.push(
		promLoad
	);
});


Promise.all( loaders ).then(function() {
	document.documentElement.className += " fontface";
	sessionStorage.setItem('fontfaceLoaded', APP.config.siteVersion);
}, function() {
	document.documentElement.className += " fontface--timeout";
});


