const WebpackConfig = require('./webpack.config');
const _ = require('lodash');
const path = require('path');
module.exports = (entry, output) => {
  return _.merge({}, WebpackConfig, {
    mode: 'development',
    entry: './src/' + entry,
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: output
    }
  });
};
