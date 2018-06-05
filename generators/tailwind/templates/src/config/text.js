const colors = require("./colors");

// Assume browser default,
// assume 100% for HTML
const fontBase = 16;

function px2rem( px, base ) {

	if (typeof px === 'string') {
		if (px.indexOf('rem') != -1) { return px; }
		px = (px+'').replace('px','');
	}

	base = base ? base : '16';
	base = base.replace('px','');
	px = parseFloat( px );

	var rem = px/base;

	if ( typeof rem === 'NaN' ) {
		return false;
	}

	return px/base + 'rem';
}


// PSD fonts:

/*
	h1: '50px'
*/

module.exports = {

	colors: colors,

	// Use a single number to represent a px value,
	// if the base were 16px. This way it's easy to just
	// write a class for the font size in a PSD, but we output
	// rems 
	textSizes: {
		'12': px2rem( 12 ),
		'13': px2rem( 13 ),
		'14': px2rem( 14 ),
		'15': px2rem( 15 ),
		'base': '1rem',
		'18': px2rem( 18 ),
		'20': px2rem( 20 ),
		'22': px2rem( 22 ),
		'28': px2rem( 28 ),
		'32': px2rem( 32 ),
		'36': px2rem( 36 ),
		'45': px2rem( 45 ),
		'60': px2rem( 60 ),
		'74': px2rem( 74 ),

	},

	fontWeights: {
		'normal': 400,
		'medium': 500,
		'bold': 700
	},

	leading: {
		'uc': 0.9,
		'none': 1,
		'tight': 1.333,
		'normal': 1.5,
		'loose': 2
	},

	tracking: {
		'tight': '-0.025em',
		'normal': '0',
		'medium': '0.0125em',
		'wide': '0.04em',
	}
};
