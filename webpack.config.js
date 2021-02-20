const HtmlWebpackPlugin = require('html-webpack-plugin');  // installed via npm
const CopyPlugin = require('copy-webpack-plugin');  // installed via npm
const webpack = require('webpack');  // to access built-in plugins
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'citefrombib.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: "citefrombib",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        // test: /\.(js|jsx)$/,
        // use: 'babel-loader',
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: '/node_modules/',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', 'js'],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    // new HtmlWebpackPlugin({ template: './public/index.html' }),
    new CopyPlugin({
      patterns: [
        { from: "./demo" },
      ],
    }),
  ],
};
