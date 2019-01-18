module.exports = function(config) {
  const { KARMA_FILE = 'src/**/*.spec.js' } = process.env;
  const FILE = KARMA_FILE || 'src/**/*.spec.js';
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/env'],
                plugins: ['@babel/plugin-proposal-export-default-from']
              }
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
