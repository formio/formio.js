module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    webpack: {
      mode: 'development'
    },
    files: [
      'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
      'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
      'dist/formio.full.min.css',
      'src/**/*.spec.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'src/**/*.spec.js': ['webpack']
    },
    browserNoActivityTimeout: 30000,
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
