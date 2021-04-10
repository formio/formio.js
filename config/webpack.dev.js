const _ = require('lodash');
const path = require('path');
const WebpackConfig = require('./webpack.config');

module.exports = _.merge({}, WebpackConfig, {
  mode: 'development',
  entry: `./lib/index.js`,
  output: {
    library: 'Formio',
    libraryTarget: 'umd',
    libraryExport: 'Formio',
    path: path.resolve(__dirname, '../dist'),
    filename: 'formio.js',
    environment: {
      arrowFunction: false
    },
  }
});
