module.exports = function(gulp, plugins) {
  return function () {
    return plugins.browserify({
      entries: './src/formio.form.js',
      debug: false
    })
      .transform('babelify', {presets: ['es2015']})
      .bundle()
      .pipe(plugins.source('formio.form.js'))
      .pipe(gulp.dest('dist/'))
      .pipe(plugins.rename('formio.form.min.js'))
      .pipe(plugins.streamify(plugins.uglify()))
      .pipe(gulp.dest('dist/'));
  };
};
