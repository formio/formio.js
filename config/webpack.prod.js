const _ = require('lodash');
const webpack = require('webpack');

const packageJSON = require('../package.json');

module.exports = (entry, output) => {
  return _.merge({}, require('./webpack.dev')(entry, output), {
    mode: 'production',
    output: {
      library: 'Formio',
      libraryTarget: 'umd',
      libraryExport: 'default',
      filename: output
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.BannerPlugin(
        `formiojs v${packageJSON.version} | https://unpkg.com/formiojs@${packageJSON.version}/LICENSE.txt`
      )
    ]
  });
};
