var Generator = require('yeoman-generator');

module.exports = class extends Generator {
	// http://yeoman.io/authoring/index.html#extending-generator
	constructor(args, opts) {
		super(args, opts);
	}

	initializing() {
		this.composeWith(require.resolve('../prompts'));
    	

		[  // List tasks for the default generator:
			'../tailwind',
			'../javascript',
			'../gulp',
			'../email',
		].forEach( t => {
			this.composeWith(require.resolve( t ), { parent: true });
		});
	
	}

	writing() {
	 	
	}

	install() {
		this.npmInstall();
	}

};