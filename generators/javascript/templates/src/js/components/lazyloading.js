/*----------  Lazyloading:  ----------*/
const lazysizes = require("lazysizes");

import { onSrcLoad } from 'libs/helpers';

// Does <img> out of the box, but we need some additions:
document.addEventListener('lazybeforeunveil', function(e) {

	var bg = e.target.getAttribute('data-bg');
	var video = e.target.getAttribute('data-video');
	var svgImage = e.target.getAttribute('data-href');

	// <div data-bg="etc"> turned into background-image
	if(bg){

		e.target.style.backgroundImage = 'url(' + bg + ')';
		e.target.classList.add('bg-loading');

		// reveal when the image has loaded:
		onSrcLoad( bg, function() {
			e.target.classList.remove('bg-loading');
		});
	}

	// Append video source. This is a bit basic, you may
	// wish to expand on this for the project and desired
	// behaviour.
	if (video) {
		e.target.innerHTML = `<source src="${video}" type="video/mp4">`;	
	};

	// Update <image> tags in SVGS:
	if (svgImage) {
		e.target.classList.add('bg-loading');
		onSrcLoad( svgImage, function() {
			e.target.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', svgImage );
			e.target.classList.remove('bg-loading');
		});
	}
});
