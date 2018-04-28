const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
 //devtool: 'eval-source-map',
  watch: true,

  entry: {
    'app': [
      './client/src/'
    ]
  },

  output: {
    filename: 'js/app.js'
   // chunkFilename: '[id].chunk.js'
  },

  devServer: {
    contentBase: './client/public',
    historyApiFallback: true,
    stats: 'minimal',// none (or false), errors-only, minimal, normal (or true) and verbose
    watch: true
  },
  //
plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      },
      output: {
        comments: false
      }
    })
  ]
  
});
