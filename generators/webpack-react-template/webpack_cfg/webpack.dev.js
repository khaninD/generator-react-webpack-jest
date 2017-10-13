const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('../webpack.config.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 8080,
    noInfo: false,
    host: 'localhost'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});