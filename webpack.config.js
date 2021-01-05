const path = require('path');

module.exports = {
	entry: {
		main: './src/js/main.js',
	},
	mode: 'production', // 'development'
	output: {
		filename: 'js/[name].min.js',
		chunkFilename: 'js/[name].min.js',
		path: path.resolve(__dirname, 'dist'),
	},
	stats: 'minimal',
	devtool: 'sourcemap',
	// watch: true,
	module: {
		rules: [{
			test: /\.m?js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						['@babel/env', {
							'targets': '> 0.25%, IE 11',
							// 'useBuiltIns': 'usage', // Neede to add polyfills
							// 'corejs': 3,            // Neede to add polyfills
							// 'debug': true,
						}]
					]
				}
			}
		}]
	}
};
