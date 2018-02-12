module.exports = function(gulp, plugins) {
  return function () {
    return plugins.browserify({
      entries: './lib/utils/index.js',
      debug: false
    })
      .bundle()
      .pipe(plugins.source('formio.utils.js'))
      .pipe(gulp.dest('dist/'))
      .pipe(plugins.rename('formio.utils.min.js'))
      .pipe(plugins.streamify(plugins.uglify()))
      .pipe(gulp.dest('dist/'));
  };
};
