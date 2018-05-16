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
		
	 	this.fs.copyTpl(
	    	this.templatePath('./'),
	    	this.destinationPath('./'),
      		{  });

	 	const pkgJson = {
			devDependencies: {
		   		'gulp': '^4.0.0',
		   	

			}
		};

	 	this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}


	install() {
		this.log("Tailwind Install");
		this.npmInstall();
	}

};