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
    			"babelify": "^8.0.0",
    			"gulp-rimraf":"latest",
		   		'browserify': '16.2.2',
		   		"babel-core": "^6.26.3",
		   		"browserify-shim": "^3.8.14",
    			"browser-sync": "^2.18.13",
    			"gulp-babel-minify": "^0.2.0",
    			"cssnano": "^3.10.0",
		   		'gulp': '^4.0.0',
		   		"clear-module": "^2.1.0",
		   		"gulp-changed": "^1.3.2",
		   		"gulp-load-plugins": "^1.5.0",
    			"gulp-sass-vars": "^1.3.0",
    			"gulp-sass": "^4.0.1",
    			"gulp-sourcemaps": "^2.6.4",
    			"gulp-svg-symbols": "^2.0.2",
    			"gulp-svgmin": "^1.2.4",
    			"gulp-filter": "^5.1.0",
    			"babel-preset-env": "^1.6.1",
    			"babel-preset-es2015": "^6.24.1",
    			"gulp-autoprefixer": "^3.1.1",
    			"gulp-plumber": "^1.2.0",
    			"gulp-rename": "^1.2.3",
    			"watchify": "^3.9.0",
    			"optional-require": "^1.0.0",
    			"vinyl-buffer": "^1.0.0",
    			'gulp-print': "latest",
				"vinyl-source-stream": "^2.0.0",
			}
		};

	 	this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}


	install() {
		this.npmInstall();
	}

};