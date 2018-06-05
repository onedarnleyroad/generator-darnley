

var APP = window.APP || {};

// Assumes tailwind config is present:
const mediaQueries = require("libs/media-queries");
const breakpoints = require('config/breakpoints');
APP.media = new mediaQueries( breakpoints.rulesets );


// init lazyloading
require('components/lazyloading');