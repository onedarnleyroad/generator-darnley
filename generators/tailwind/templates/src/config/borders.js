const colors = require("./colors");

module.exports = {

	borderColors: Object.assign({ default: colors['grey-light'] }, colors),

	borderWidths: {
		'default': '1px',
		'0': '0',
		'3': '3px',
		'10': '10px'
	},

	borderRadius: {
		'default': '3px',
		'full': '9999px',
		'none': '0'
	}
};
