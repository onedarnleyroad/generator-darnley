var Generator = require('yeoman-generator');

module.exports = class extends Generator {
	// http://yeoman.io/authoring/index.html#extending-generator
	constructor(args, opts) {
		super(args, opts);
	}

	initializing() {
    	this.composeWith(require.resolve('../email'));
	}

	prompting() {
		return this.prompt([{
			type    : 'input',
			name    : 'name',
			message : 'Your project name',
			store 	: true,
			default : this.appname // Default to current folder name
		}]).then((answers) => {
			this.options.name = answers.name;

		});
	}


	debug() {
		this.name;

	}


	writing() {
	 	this.fs.copyTpl(
	    	this.templatePath('tailwind.js'),
	    	this.destinationPath('tailwind.js'),
      		{ title: this.options.name });
	}

};