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
		
	 	this.fs.copy(
	    	this.templatePath('src/'),
	    	this.destinationPath('src/'),
      		{  });

	 	const pkgJson = {
			devDependencies: {
				'vue': 'latest',
				'loadjs': 'latest',
				'lazysizes': 'latest',
				'axios': 'latest',
				'fontfaceobserver': 'latest',
				'promise-polyfill': 'latest',
			}
		};

	 	this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}


	install() {
		this.log("Tailwind Install");
		this.npmInstall();
	}

};