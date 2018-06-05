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
	    	this.templatePath('src/'),
	    	this.destinationPath('src/'),
      		{  });

	 	const pkgJson = {
			devDependencies: {
				"axios": "^0.17.1",
				"lazysizes": "^4.0.1",
				"loadjs": "^3.5.1",
				"fontfaceobserver": "^2.0.13",
				"promise-polyfill": "^6.1.0"
			}
		};

	 	this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}


	install() {
		this.log("Tailwind Install");
		this.npmInstall();
	}

};