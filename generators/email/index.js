var Generator = require('yeoman-generator');

module.exports = class extends Generator {
	// http://yeoman.io/authoring/index.html#extending-generator
	constructor(args, opts) {
		super(args, opts);
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



	writing() {
		
		// let options = this.config.getAll();
		// console.log(`Writing ${options.promptValues.name}`);

	 	this.fs.copyTpl(
	    	this.templatePath('_layout.html'),
	    	this.destinationPath('src/email/_layout.html'),
      		{});
	}

};