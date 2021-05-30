const _ = require('lodash');
const webpack = require('webpack');

const packageJSON = require('../package.json');

module.exports = _.merge({}, require('./webpack.dev'), {
  mode: 'production',
  output: {
    filename: 'formio.min.js'
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new webpack.BannerPlugin(
      `formiojs v${packageJSON.version} | https://unpkg.com/formiojs@${packageJSON.version}/LICENSE.txt`
    )
  ]
});
