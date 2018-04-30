module.exports = function(gulp, plugins) {
  return function () {
    return plugins.browserify({
      entries: './lib/formio.grid.js',
      debug: false
    })
      .bundle()
      .pipe(plugins.source('formio.grid.js'))
      .pipe(gulp.dest('dist/'))
      .pipe(plugins.rename('formio.grid.min.js'))
      .pipe(plugins.streamify(plugins.uglify()))
      .pipe(gulp.dest('dist/'));
  };
};
