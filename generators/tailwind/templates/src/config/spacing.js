

/*----------
NAMED SPACING

Good for gutters between
cards etc, sitewide things

----------*/

let scale = .25;
let unit = 'rem';
let increment = 1;
let start = 1;


// '0': '0',
// '1': '0.25rem',
// '2': '0.5rem',
// '3': '0.75rem',
// '4': '1rem',
// '5': '1.25rem',
// '6': '1.5rem',
// '7': '1.75rem',
// '8': '2rem',
// '9': '2.25rem',
// '10': '2.5rem',
// '11': '2.75rem',
// '12': '3rem',
// '13': '3.25rem',
// '14': '3.5rem',
// '15': '3.75rem',
// '16': '4rem',
// '17': '4.25rem',
// '18': '4.5rem',
// '19': '4.75rem',
// '24': '6rem',
// '28': '7rem',
// '32': '8rem',
// '36': '9rem',
// '40': '10rem',
// '44': '11rem',
// '48': '12rem',
// '52': '13rem',
// '56': '14rem',
// '60': '15rem',
// '64': '16rem',
// '68': '17rem',
// '72': '18rem',
// '76': '19rem',
// '80': '20rem',
// '84': '21rem',
// '88': '22rem',
// '92': '23rem',
// '96': '24rem',
// '100': '25rem',

let scales = [
	
	// 1, 2, 3 ... 20
	// 0.25rem, .5rem, .75rem ... 5rem
	{
		nameSuffix: '',
		scale: .25,
		unit: 'rem',
		step: 1,
		start: 1,
		end: 20
	},

	// 24, 28, 32 ... 100
	// 6rem, 7rem, 8rem ... 25rem
	{
		nameSuffix: '',
		scale: .25,
		unit: 'rem',
		step: 4,
		start: 5,
		end: 26
	},
];


// Start with 0 and 1px 
let spacing = {
	'0': '0',
	'px': '1px',
};

// Extend programmatically:
scales.forEach( scale => {

	for (let i = scale.start; i < scale.end; i++) {
		
		let s = i * scale.step;
		let u = scale.step * i * scale.scale;

		spacing[`${s}${scale.nameSuffix}`] = `${u}${scale.unit}`;

	}

});


let marginSpacing = Object.assign({}, spacing, {
	'auto': 'auto',

	// percentages for offsets:
	'1/2': '50%',
	'1/3': '33.333%',
	'2/3': '66.666%',
	'1/4': '25%',
	'3/4': '75%',
	'1/5': '20%'
});


let paddingSpacing = Object.assign({}, spacing, {
	// add padding, that isn't also margins here.
});


module.exports = {
	padding: paddingSpacing,
	margin: marginSpacing,
	negativeMargin: marginSpacing
};
