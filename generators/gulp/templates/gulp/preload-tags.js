
const fs = require('fs');
const twConfig = require('../tailwind');
const config = require('../gulpfile.config');
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;

module.exports = function() {
	return new Promise(function (resolve, reject) {
		var text = "";

	


		function writeFile(path, contents, cb) {
		  mkdirp(getDirName(path), function (err) {
		    if (err) return cb(err);

		    fs.writeFile(path, contents, cb);
		  });
		}

		twConfig.fontPaths.forEach( def => {

			def.srcs.forEach( src => {
				if (src.format === 'woff2') {
					let row = `<link rel="preload" href="${src.url}" type="font/woff2" crossorigin as="font">`;
					text = `${text}${row}\n`;
				}
			});

		});

		writeFile( config.dest.preload, text.trim(), (err) => {
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

