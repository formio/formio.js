module.exports = function(gulp, plugins) {
  return function () {
    return plugins.browserify({
      entries: './lib/formio.contrib.js',
      debug: false
    })
      .bundle()
      .pipe(plugins.source('formio.contrib.js'))
      .pipe(gulp.dest('dist/'))
      .pipe(plugins.rename('formio.contrib.min.js'))
      .pipe(plugins.streamify(plugins.uglify()))
      .pipe(gulp.dest('dist/'));
  };
};
