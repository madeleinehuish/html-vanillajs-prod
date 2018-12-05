const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

let pathsToClean = ['dist'];
// let cleanOptions = { exclude:  ['styles'] };
let cleanOptions = {};

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
	htmlWebPackPluginArray.push( new HtmlWebpackPlugin({ filename, template }) );
}

module.exports = {
	entry: {
		index: './src/index.js',
		dropdown: './src/js/dropdown.js',
		getData: './src/js/getData.js',
		getData2: './src/js/getData2.js',
		getData3: './src/js/getData3.js',
		jqueryStuff: './src/js/jqueryStuff.js',
		lists: './src/js/lists.js',
		pokemon: './src/js/pokemon.js',
		time: './src/js/time.js',
		trucks: './src/js/trucks.js',
		youTube: './src/js/youTube.js'
	},
	output: {
		filename: 'js/[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
					// , options: { sourceMap: true, convertToAbsoluteUrls: true } },
					{ loader: 'css-loader'}
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
  ]
}
