'use strict';
const twConfig = require('../tailwind');
const config = require('../gulpfile.config');
const fs = require('fs');
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;

let previews = {
	
	'aspectRatio': 'ar-',
	'fonts': 'font-',
	'textSizes': 'text-',
	'fontWeights': 'font-',
	'leading': 'leading-',
	'tracking': 'tracking-',
	'textColors': 'text-',
	'width': 'w-',
	'padding': 'p-'

};
    
module.exports = function( done ) {
	const showdown  = require('showdown');
	let converter = new showdown.Converter();

	let output = ''

	const line = function( str ) {
		output = output.concat( '\n' ).concat( str );
	};

	function writeFile(path, contents, cb) {
	  mkdirp(getDirName(path), function (err) {
	    if (err) return cb(err);

	    fs.writeFile(path, contents, cb);
	  });
	}
	
	Object.keys( twConfig ).forEach( property => {
		
		let data = twConfig[ property ];

		// blacklist of reporting. 
		if ( [ 'modules', 'options', 'plugins' ].indexOf( property ) >= 0 )
		{
			// Or report differently?
			return;
		}

		let setting = twConfig.modules[ property ];
		// skip, it's not been used
		if ( !setting ) { return; } 

		line( '---------------------' );
		line( `## ${property}`);

		line(`Module: [${setting.join(', ')}]`);

		
		line('<table class="pre">');

		Object.keys( data ).forEach( key => {
			line("<tr>");
			line( `<td>${key} :</td><td>${data[key]}</td>` );

			
			if ( typeof previews[property] === 'string' )
			{
				line(`<td class=""><div class="border border-black ${previews[property]}${key}">${previews[property]}${key}</div></td>`);
			} else {
				line(`<td></td>`);
			}

			line("</tr>");
		});

		line('</table>');

	});

	// fs.writeFile('tailwind-report.html',  md.toHTML( output ), (err) => {
	// 	if (err) throw err;
	// 	console.log('The file has been saved!');
	// 	done();
	// });

	var html = converter.makeHtml(output);

	writeFile(`${config.dest.tailwindReport}`,  html, (err) => {
		if (err) throw err;
		console.log('The file has been saved!');
		done();
	});
	
};
