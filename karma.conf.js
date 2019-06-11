module.exports = function(config) {
  const { KARMA_FILE = 'src/**/*.spec.js' } = process.env;
  const FILE = KARMA_FILE || 'src/**/*.spec.js';
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    webpack: {
      mode: 'development',
      module: {
        // allows require with expression (aka "context") as used in power-assert
        // (see https://github.com/power-assert-js/babel-plugin-espower/issues/14)
        exprContextCritical: false,
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: require('./babel.config.js')
            }
          }
        ]
      }
    },
    files: [
      'app/bootstrap/css/bootstrap.min.css',
      'app/fontawesome/css/font-awesome.min.css',
      'dist/formio.full.min.css',
      {
        pattern: 'dist/fonts/*',
        watched: false,
        included: false,
        served: true,
        nocache: false
      },
      {
        pattern: 'dist/icons/*',
        watched: false,
        included: false,
        served: true,
        nocache: false
      },
      FILE
    ],
    exclude: [
    ],
    preprocessors: {
      [FILE]: ['webpack']
    },
    browserNoActivityTimeout: 30000,
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  });
};
