const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

let pathsToClean = ['dist'];
let cleanOptions = { exclude:  ['styles'] };

let htmlFiles = [
	'lists',
	'lists2',
	'lists3',
	'lists4',
	'forms2',
	'forms3',
	'getData',
	'getData2',
	'getData3',
	'pokemon',
	'trucks',
	'youTube'
]

let htmlWebPackPluginArray = [];
for(let elem of htmlFiles) {
	let filename = `pages/${elem}.html`;
	let template = `src/pages/${elem}.html`
	htmlWebPackPluginArray.push( new HtmlWebpackPlugin({ filename, template, chunks: ['main'] }) );
}

module.exports = {
	entry: {
		home: './src/index.js',
		test: './src/test.js',
		dropdown: './src/js/dropdown.js',
		getData: './src/js/getData.js',
		getData2: './src/js/getData3.js',
		jqueryStuff: './src/js/jqueryStuff.js',
		lists: './src/js/lists.js',
		pokemon: './src/js/pokemon.js',
		time: './src/js/time.js',
		trucks: './src/js/trucks.js',
		youTube: './src/js/youTube.js'
	},
	output: {
		filename: 'js/[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
	plugins: [
		new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html',
			chunks: ['main']
		}),
		...htmlWebPackPluginArray
		// // new HtmlWebpackPlugin({
		// // 	filename: 'test.html',
		// // 	template: 'src/test.html',
		// // 	chunks: ['main']
		// // }),
		// new HtmlWebpackPlugin({
		// 	filename: 'pages/lists.html',
		// 	template: 'src/pages/lists.html',
		// 	chunks: ['main']
		// }),
		// new HtmlWebpackPlugin({
		// 	filename: 'pages/lists2.html',
		// 	template: 'src/pages/lists2.html',
		// 	chunks: ['main']
		// }),
		// new HtmlWebpackPlugin({
		// 	filename: 'pages/lists3.html',
		// 	template: 'src/pages/lists3.html',
		// 	chunks: ['main']
		// }),
		// new HtmlWebpackPlugin({
		// 	filename: 'pages/lists4.html',
		// 	template: 'src/pages/lists4.html',
		// 	chunks: ['main']
		// }),
		// new HtmlWebpackPlugin({
		// 	filename: 'pages/forms.html',
		// 	template: 'src/pages/formClass.html',
		// 	chunks: ['main']
		// }),
		// new HtmlWebpackPlugin({
		// 	filename: 'pages/forms2.html',
		// 	template: 'src/pages/forms2.html',
		// 	chunks: ['main']
		// }),
		// new HtmlWebpackPlugin({
		// 	filename: 'pages/forms3.html',
		// 	template: 'src/pages/forms3.html',
		// 	chunks: ['main'],
		// new HtmlWebpackPlugin({
		// 	filename: 'pages/getData.html',
		// 	template: 'src/pages/getData.html',
		// 	chunks: ['main']
		// }),
		// new HtmlWebpackPlugin({
		// 	filename: 'pages/getData2.html',
		// 	template: 'src/pages/getData2.html',
		// 	chunks: ['main']
		// }),
		// new HtmlWebpackPlugin({
		// 	filename: 'pages/getData3.html',
		// 	template: 'src/pages/getData3.html',
		// 	chunks: ['main']
		// }),
		// new HtmlWebpackPlugin({
		// 	filename: 'pages/pokemon.html',
		// 	template: 'src/pages/pokemon.html',
		// 	chunks: ['main'],
		// new HtmlWebpackPlugin({
		// 	filename: 'pages/pokemon.html',
		// 	template: 'src/pages/trucks.html',
		// 	chunks: ['main'],
		// new HtmlWebpackPlugin({
		// 	filename: 'pages/pokemon.html',
		// 	template: 'src/pages/youTube.html',
		// 	chunks: ['main']
		// })
  ]
}
