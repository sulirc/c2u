const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./react/demo/index.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "react/dist"),
    clean: true,
  },
  devServer: {
    contentBase: "./dist",
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "(C2U) React",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      },
    ],
  },
};
