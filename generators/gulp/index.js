const Generator = require('yeoman-generator');

module.exports = class extends Generator {
	// http://yeoman.io/authoring/index.html#extending-generator
	constructor(args, opts) {
		super(args, opts);
	}


	initializing() {

		console.log("Darn Gen 2");

		if (!this.options.parent) {
			this.composeWith(require.resolve('../prompts'));
		}
	}

	writing() {

		this.fs.copyTpl(
			this.templatePath('./'),
			this.destinationPath('./'),
			{}
		);

		const pkgJson = {

			dependencies: {
				vue: 'latest',
				loadjs: 'latest',
				lazysizes: 'latest',
				axios: 'latest',
				fontfaceobserver: 'latest',
				'promise-polyfill': 'latest',
			},

			devDependencies: {
				tailwindcss: "^0.6.6",
				"vue-loader": 'latest',
				"babel-loader": 'latest',
				"vue-template-compiler": 'latest',
				"html-webpack-plugin": 'latest',
				"html-webpack-harddisk-plugin": 'latest',
				webpack: 'latest',
				"webpack-dev-server": 'latest',
				"@babel/core": 'latest',
				"@babel/preset-env": 'latest',
				"@babel/plugin-proposal-object-rest-spread": 'latest',
				"gulp-rimraf": "latest",
				"browser-sync": "^2.18.13",
				"gulp-imagemin": "^4.1.0",
				showdown: "^1.8.6",
				cssnano: "^4.1.0",
				gulp: '^4.0.0',
				"clear-module": "^2.1.0",
				'gulp-util': 'latest',
				"gulp-changed": "^1.3.2",
				"gulp-load-plugins": "^1.5.0",
				"gulp-sass-vars": "^1.3.0",
				"gulp-juice": "^0.1.0",
				"gulp-sass": "^4.0.1",
				"gulp-sourcemaps": "^2.6.4",
				"gulp-svg-symbols": "^2.0.2",
				"gulp-svgmin": "^1.2.4",
				"gulp-filter": "^5.1.0",
				"gulp-autoprefixer": "^3.1.1",
				"gulp-plumber": "^1.2.0",
				"gulp-rename": "^1.2.3",
				"optional-require": "^1.0.0",
				'gulp-print': "latest",
				"gulp-purgecss": "^0.14.0",
				mkdirp: "latest"
			}
		};

		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}


	install() {
		this.npmInstall();
	}

};
