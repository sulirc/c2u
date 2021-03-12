const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './react/demo/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'react/dist'),
    clean: true,
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '(C2U) React',
      template: 'react/demo/index.html',
    }),
    new webpack.ProvidePlugin({
      Snabbdom: 'React',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      React: 'snabbdom-pragma',
    },
  },
};
