const path = require('path');

module.exports = {
	entry: './src/js/main.js',
	mode: 'production',
	output: {
		filename: 'js/main.min.js',
		path: path.resolve(__dirname, 'dist')
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
							'targets': '> 0.25%, IE 10',
							// 'useBuiltIns': 'usage'
						}]
					]
				}
			}
		}]
	}
};
