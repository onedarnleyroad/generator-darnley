
const fs = require('fs');
const twConfig = require('../tailwind');
const config = require('../gulpfile.config');

module.exports = function() {
	return new Promise(function (resolve, reject) {
		var text = "";

		// Make the directory, if it doesnt exist, writeFile won't make a folder
		if (!fs.existsSync(dir)){
		    fs.mkdirSync(dir);
		}

		twConfig.fontPaths.forEach( def => {

			def.srcs.forEach( src => {
				if (src.format === 'woff2') {
					let row = `<link rel="preload" href="${src.url}" type="font/woff2" crossorigin as="font">`;
					text = `${text}${row}\n`;
				}
			});

		});

		fs.writeFile( config.dest.preload, text.trim(), (err) => {
			if (err) {
				console.error("Couldn't write preload file");
				reject();
				return;
			}
			console.log("Preload template successfully written");
			resolve();
			
		});
	});

};

