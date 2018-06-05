


module.exports = {

	makebreakpoint: query => {

		var _maxWidth = function( size ) {
			return 'max-width: ' + size + '';
		};

		var _minWidth = function( size ) {
			return 'min-width: ' + size + '';
		};

		var _withinWidth = function( min, max ) {
			return 'min-width: ' + min + ') and (max-width: ' + max + '';
		}

		var _createRule = query => {
			if (query.hasOwnProperty( 'max' ) && query.hasOwnProperty( 'min') ) {
				return _withinWidth( query.min, query.max );
			} else if (query.hasOwnProperty( 'min' )) {
				return _minWidth( query.min );
			} else if (query.hasOwnProperty( 'max')) {
				return _maxWidth( query.max );
			} else if ( typeof query === "string" ) {
				return _minWidth( query );
			} else {
				return false; // ?
			}
		};




		if ( Array.isArray( query ) ) {

			var output = [];

			query.forEach( q => {
				let rule = _createRule( q );

				if (rule) {
					output.push( rule );
				}

			});

			return output.join('),(');

		} else {
			return _createRule( query );
		}

	},

	rulesets: {

		'mobile-only': 	{ max: '767px' 	},
		'not-mobile': { min: '768px' },

		'tablet': 		{ min: '768px' },
		'tablet-only': 	{ min: '768px', max: '1100px' },
		'tablet-below':	{ max: '1100px' },
		'not-tablet': [ { max: '767px' }, { min: '1101px' } ],

		'laptop':		{ min: '1101px' },
		'laptop-only':	{ min: '1101px', max: '1440px' },
		'laptop-below':	{ max: '1440px' },
		'not-laptop': [ { max: '1100px' }, { min: '1441px' } ],

		'not-desktop': { max: '1440px' },
		'desktop':		{ min: '1441px' },
		// 'desktop-only':	// superfluos
		// 'desktop-below':	// superfluos


		// Design based breakpoints

		'max': { max: '1600px' },
		'max-padded': { max: '1530px' },
		'max-above': { min: '1601px' },

		'max-xs': { max: '1170px' },
		'max-xs-above': { min: '1171px' },

		// Same as 'tablet-below', however, as this
		// might change from project to project, or
		// be subtle based on design rather than device,
		// it's good to refer to it differently.
		'mobilemenu': { max: '1100px' }
	}

};
