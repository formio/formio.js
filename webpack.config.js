const webpack = require('webpack');
const path = require('path');
const packageJSON = require('./package.json');
module.exports = {
	mode: 'development',
	performance: {
		hints: false,
	},
	entry: {
		formio: './lib/cjs/Formio.js',
		'formio.utils': './lib/cjs/utils/utils.js',
		'formio.full': './lib/cjs/index.js',
		'formio.form': './lib/cjs/formio.form.js',
		'formio.embed': './lib/cjs/formio.embed.js',
	},
	output: {
		library: 'Formio',
		libraryTarget: 'umd',
		libraryExport: 'Formio',
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js',
		environment: {
			arrowFunction: false,
		},
	},
	module: {
		rules: [
			{
				test: /\/(Formio|Embed)\.js$/,
				loader: 'string-replace-loader',
				options: {
					search: 'FORMIO_VERSION',
					replace: packageJSON.version,
				},
			},
		],
	},
	plugins: [
		new webpack.IgnorePlugin({
			resourceRegExp: /^\.\/locale$/,
			contextRegExp: /moment$/,
		}),
	],
	resolve: {
		extensions: ['.js'],
	},
};
