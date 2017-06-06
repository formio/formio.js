module.exports = function(gulp, plugins) {
  return function () {
    return plugins.browserify({
      entries: './build/formio.factory.js',
      debug: false
    })
      .bundle()
      .pipe(plugins.source('formio.factory.js'))
      .pipe(gulp.dest('dist/'))
      .pipe(plugins.rename('formio.factory.min.js'))
      .pipe(plugins.streamify(plugins.uglify()))
      .pipe(gulp.dest('dist/'));
  };
};
