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
		
		// let options = this.config.getAll();
		this.log("Tailwind writing");
		this.log( this.config.getAll() );

	 	this.fs.copyTpl(
	    	this.templatePath('src/'),
	    	this.destinationPath('src/'),
      		{  });

	 	this.fs.copyTpl(
	    	this.templatePath('tailwind.js'),
	    	this.destinationPath('tailwind.js'),
      		{  });

	 	const pkgJson = {
			devDependencies: {
		   		'tailwindcss': '^0.5.3',
		   		'gulp-postcss': '^7.0.0',

			}
		};

	 	this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}


	install() {
		this.log("Tailwind Install");
		this.npmInstall();
	}

};