const webpack = require('webpack');
const path = require('path');
const packageJSON = require('../package.json');
module.exports = {
  mode: 'development',
  performance: {
    hints: false
  },
  entry: {
    'formio': './lib/Formio.js',
    'formio.utils': './lib/utils/utils.js',
    'formio.full': './lib/index.js',
    'formio.form': './lib/formio.form.js',
    'formio.embed': './lib/formio.embed.js'
  },
  output: {
    library: 'Formio',
    libraryTarget: 'umd',
    libraryExport: 'Formio',
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    environment: {
      arrowFunction: false
    },
  },
  module: {
    rules: [
      {
        test: /\/Formio\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: 'FORMIO_VERSION',
          replace: packageJSON.version,
        }
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
  ]
};
