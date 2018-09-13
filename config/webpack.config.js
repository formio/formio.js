const webpack = require('webpack');
module.exports = {
  performance: {
    hints: false
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ]
};
