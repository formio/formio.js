module.exports = function(gulp, plugins) {
  return function () {
    return plugins.browserify({
      entries: './lib/formio.form.js',
      debug: false
    })
      .bundle()
      .pipe(plugins.source('formio.form.js'))
      .pipe(gulp.dest('dist/'))
      .pipe(plugins.rename('formio.form.min.js'))
      .pipe(plugins.streamify(plugins.uglify()))
      .pipe(gulp.dest('dist/'));
  };
};
