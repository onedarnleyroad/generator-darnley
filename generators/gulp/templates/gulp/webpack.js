const WebpackDevServer = require("webpack-dev-server");
const Webpack = require('webpack');
const gutil = require('gulp-util');

const server = function (webpackConfig) {

	return function () {
		return new Promise((resolve, reject) => {


			// Copy dev server config, and modify a little so that it works
			// for the node api...
			const devServerOptions = Object.assign({}, webpackConfig.devServer, {
				stats: {
					colors: true
				},
				publicPath: '/assets/js/'
			});

			// Parse the entries to add the hot module replacement additions to the entry...
			WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions);

			// Build a webpack compiler...
			const compiler = Webpack(webpackConfig);

			// Build a dev server
			const server = new WebpackDevServer(compiler, devServerOptions);

			// listen to that server...
			server.listen(9000, '127.0.0.1', () => {
				console.log("starting webpack dev server");
				resolve();
			});

		});
	}
};


const build = function (webpackConfig) {

	return function () {

		return new Promise((res, rej) => {
			Webpack(webpackConfig, (err, stats) => {
				if (err || stats.hasErrors()) {
					console.log(err);
					rej("Webpack couldn't compile");
				} else {
					console.log("Webpack finished compiling");
					gutil.log('[webpack:build]', stats.toString({
						chunks: false, // Makes the build much quieter
						colors: true
					}));
					res("Webpack Done");
				}

			});
		});
	};
};


module.exports = {
	server,
	build,
};