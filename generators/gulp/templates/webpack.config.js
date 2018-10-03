/* eslint-env node */

const path = require("path");
const webpack = require('webpack');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const { webpack: config } = require('./gulpfile.config');

const entries = {};

config.scripts.forEach(name => entries[name] = `./src/js/${name}.js`);

module.exports = isProduction => {

	const production = isProduction || false;
	const htmlWebpackPlugins = [];

	config.scripts.forEach( filename => {
		if ( filename !== 'inlined' ) {
			htmlWebpackPlugins.push(
				new HtmlWebpackPlugin({
					alwaysWriteToDisk: true,
					minify: {
						collapseWhitespace: true,
						preserveLineBreaks: true,
					},
					template: config.htmlTemplate,
					filename: `${config.htmlDestination}${production ? 'production' : 'dev'}_${filename}.html`,
					excludeChunks: config.scripts.filter( name => name != filename && name != 'inlined' ),
					inject: false,
					production
				})
			);
		}
	});

	if (production) {
		console.log('Production: ', production); // true
	}

	return {
		mode: production ? 'production' : 'development',
		entry: entries,

		stats: {
			performance: false,
		},

		output: {
			publicPath: config.output.publicPath,
			filename: `[name]${production ? '.min' : ''}.js`,
			path: config.output.path
		},
		// Don't split on dev mode
		optimization: production ? { splitChunks: { chunks: 'all' } } : {},

		module: {
			rules: [
				{
					test: /.js$/,
				},
				{
					test: /\.vue$/,
					loader: "vue-loader"
				},
				{
					test: /\.js$/,
					exclude: /(node_modules|bower_components)/,

					use: [{
						loader: "babel-loader",
						options: {
							presets: [
								["@babel/preset-env", {
									modules: false
								}]
							],
							plugins: [require("@babel/plugin-proposal-object-rest-spread")]
						}
					}]
				}
			]
		},

		resolve: {
			alias: {
				components: path.resolve(__dirname, "src/js/components"),
				vendor: path.resolve(__dirname, "src/js/vendor"),
				libs: path.resolve(__dirname, "src/js/libs"),
				utilities: path.resolve(__dirname, "src/js/utilities"),

				// TW Config folder
				config: path.resolve(__dirname, "src/config"),
				vue$: 'vue/dist/vue.common.js',
			}
		},

		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new VueLoaderPlugin(),
			// Built up above...
			...htmlWebpackPlugins,	
			new HtmlWebpackHarddiskPlugin()
		],

		// Proxy to browersync, run from gulp.
		devServer: {
			https: true,
			compress: true,
			hot: true,
			inline: true,
			port: 9000,
			host: 'localhost'
		}
	};
};
