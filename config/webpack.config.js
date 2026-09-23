const webpack = require('webpack');
module.exports = {
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        // uuid 11+ ships ES2020 syntax (optional chaining, nullish coalescing), so transpile it for the browser builds.
        test: /\.js$/,
        include: /node_modules[\\/]uuid[\\/]/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            configFile: false,
            presets: ['@babel/preset-env']
          }
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
