const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    publicPath: '/',
    filename: 'index_bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2'],
        },
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'import-glob-loader',
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'postcss-loader', // formats CSS with postcss config
          'sass-loader', // compiles Sass to CSS
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        enforce: 'pre',
        loader: 'url-loader?limit=100000',
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
};

module.exports = config;
