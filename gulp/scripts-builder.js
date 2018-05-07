module.exports = function(gulp, plugins) {
  return function () {
    return plugins.browserify({
      entries: 'lib/formio.builder.js',
      debug: false
    })
      .bundle()
      .pipe(plugins.source('formio.builder.js'))
      .pipe(plugins.wrap(plugins.template, {version: plugins.packageJson.version}))
      .pipe(gulp.dest('dist'))
      .pipe(plugins.rename('formio.builder.min.js'))
      .pipe(plugins.streamify(plugins.uglify()))
      .pipe(gulp.dest('dist'));
  };
};
