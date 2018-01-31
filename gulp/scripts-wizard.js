module.exports = function(gulp, plugins) {
  return function () {
    return plugins.browserify({
      entries: './lib/formio.wizard.js',
      debug: false
    })
      .bundle()
      .pipe(plugins.source('formio.wizard.js'))
      .pipe(gulp.dest('dist/'))
      .pipe(plugins.rename('formio.wizard.min.js'))
      .pipe(plugins.streamify(plugins.uglify()))
      .pipe(gulp.dest('dist/'));
  };
};
