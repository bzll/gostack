const path = require('path');

module.exports = {
	entry: path.resolve(__dirname, 'src', 'index.js'),
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'public'),
	},
	module: {
		rules: [
			{
				// tudo que tiver entre duas / eh uma expressao regular
				// o \ serve para escapar o ponto, pois ele em si significa qualquer
				// caractere, o $ deve terminar
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
				],
			},
			{
				test: /.*\.(gif|png|jpe?g)$/i,
				use: {
					loader: 'file-loader',
				},
			},
		],
	},
};
