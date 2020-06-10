const config = require('./webpack.config.js');
config.mode = 'production';
config.output.filename = 'formio.min.js';
module.exports = config;
