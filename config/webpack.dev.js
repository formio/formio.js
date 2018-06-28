const _ = require('lodash');
const path = require('path');

const WebpackConfig = require('./webpack.config');

module.exports = (entry, output) => {
  return _.merge({}, WebpackConfig, {
    mode: 'development',
    entry: `./lib/${entry}`,
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: output
    }
  });
};
