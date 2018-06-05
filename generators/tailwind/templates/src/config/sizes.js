
// @TODO - simplify this! maybe have some width/height things manually produced?
const extend = require('extend');

const widths = {
	'auto': 'auto',
	'px': '1px',

	'1': '0.25rem',
	'2': '0.5rem',
	'3': '0.75rem',
	'4': '1rem',
	'6': '1.5rem',
	'8': '2rem',
	'10': '2.5rem',
	'12': '3rem',
	'14': '3.75rem',
	'16': '4rem',
	'18': '4.5rem',
	'20': '5rem',
	'24': '6rem',
	'28': '6.25rem',
	'32': '8rem', // 128px
	'40': '10rem',
	'36': '9rem', // 144px
	'48': '12rem', // 192px
	'52': '13rem',
	'56': '14rem',
	'60': '15rem',

	'64': '16rem', // 256px
	'80': '20rem', // 320px
	'100': '25rem',
	'115': '28.75rem',
	'128': '32rem', // 512px
	// '256': '64rem', // 1024px

	'144': '36rem',

	'330': '82.5rem',


	'1/2': '50%',
	'1/3': '33.33333%',
	'2/3': '66.66667%',
	'1/4': '25%',
	'3/4': '75%',
	'1/5': '20%',
	'2/5': '40%',
	'3/5': '60%',
	'4/5': '80%',
	'1/6': '16.66667%',
	'1/7': '14.285714286%',
	'5/6': '83.33333%',
	'full': '100%',
	'screen': '100vw',

	'xs': '26rem', // 420px
	'sm': '35rem', // 560px
	'md': '40rem', // 640px
	'lg': '50rem', // 800px
	'xl': '60rem', // 960px
	'2xl': '70rem' // 1220px


};


module.exports = {
	width: widths,
	maxWidth: extend({}, widths, { 'none':'none' }),
	minWidth: extend({}, widths, { '0':'0' }),

	height: {
		'auto': 'auto',
		'px': '1px',
		'0': '0',
		'1': '0.25rem',
		'2': '0.5rem',
		'3': '0.75rem',
		'4': '1rem',
		'6': '1.5rem',
		'8': '2rem',
		'10': '2.5rem',
		'12': '3rem',
		'14': '3.75rem',
		'16': '4rem',
		'18': '4.5rem',
		'20': '5rem',
		'24': '6rem',
		'28': '6.25rem',
		'32': '8rem',
		'36': '9rem',
		'48': '12rem',
		'64': '16rem',
		'100': '25rem',
		'full': '100%',
		'1/2': '50%',
	},


	minHeight: {
		'0': '0',
		'full': '100%',
		'screen': '100vh',
		'screen-header': 'calc( 100vh - 70px)',
		'screen-vw': '140vw'
	},

	maxHeight: {
		'none': 'none',
		'full': '100%',
		'300': '300px',
		'screen': '100vh',
	}

};
