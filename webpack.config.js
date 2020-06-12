const path = require('path');

module.exports = {
  entry: {
    formio: path.join(path.resolve(__dirname, 'lib'), 'index.js'),
    embed: './embed.js',
  },
  output: {
    library: 'Formio',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode: 'production',
  performance: { hints: false },
};
