const _ = require('lodash');
const webpack = require('webpack');
const packageJSON = require('../package.json');
module.exports = (entry, output) => {
  return _.merge({}, require('./webpack.dev')(entry, output), {
    mode: 'production',
    output: {
      filename: output
    },
    plugins: [
      new webpack.BannerPlugin(`formiojs v${packageJSON.version} | https://unpkg.com/formiojs@${packageJSON.version}/LICENSE.txt`)
    ]
  });
};
