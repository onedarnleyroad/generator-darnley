
let colors = {
	
	'inherit': 'inherit',
	'transparent': 'transparent',
	'current': 'currentColor',
	'black': '#000',
	'white': '#fff',

	// Add Brand Colors etc.

};

// Refactor as you like, eg:
let backgrounds = Object.assign({}, colors, { 
	// EG:
	// 'black-50':'rgba(0,0,0,0.5);' 
});

let text = Object.assign({}, colors, { 
	// EG:
	// 'black-50':'rgba(0,0,0,0.5);' 
});

let borders = Object.assign({}, colors, { 
	// EG:
	// 'black-50':'rgba(0,0,0,0.5);' 
});


module.exports = {
	colors,
	text,
	backgrounds,
	borders
};