module.exports = function(gulp, plugins) {
  return function () {
    return plugins.browserify({
      entries: 'lib/formio.js',
      debug: false
    })
      .bundle()
      .pipe(plugins.source('formio.js'))
      .pipe(plugins.wrap(plugins.template, {version: plugins.packageJson.version}))
      .pipe(gulp.dest('lib/dist'))
      .pipe(plugins.rename('formio.min.js'))
      .pipe(plugins.streamify(plugins.uglify()))
      .pipe(gulp.dest('lib/dist'));
  };
};
