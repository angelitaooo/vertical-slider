const webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const extractSass = new ExtractTextPlugin({
	filename: '[name].css',
	disable: process.env.NODE_ENV === 'development',
	allChunks: true
});

const indexHtmlWebpack = new HTMLWebpackPlugin({
	title: 'Yuxi Website',
	inject: true,
	template: './public/index.html',
	cache: false,
	production: false
});

module.exports = {
	entry:	{
			bundle: './src/app/app.js'
			},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'public')
	},
	plugins: [
		extractSass,
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'window.$': 'jquery',
			'jQuery': 'jquery',
			'window.jQuery': 'jquery',
			'Tether': 'tether',
			'window.Tether': 'tether'
		}),
		indexHtmlWebpack
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
		        test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: ['css-loader', 'sass-loader']
				})
		    },
			{test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
		]
	}
};
