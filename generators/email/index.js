var Generator = require('yeoman-generator');

module.exports = class extends Generator {
	// http://yeoman.io/authoring/index.html#extending-generator
	constructor(args, opts) {
		super(args, opts);
	}

	initializing() {
		if ( !this.options.parent ) {
			this.composeWith(require.resolve('../prompts'));
		}
	}

	writing() {
		
		this.log("Email Write");

		this.fs.copyTpl(
	    	this.templatePath('./'),
	    	this.destinationPath('src/email/'),
      		{  });
		
		


	 	
	}

	install() {
		this.log("Email Install");
		this.npmInstall();
	}

};