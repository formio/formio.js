module.exports = function(gulp, plugins) {
  return function () {
    return gulp.src('./src/**/*.js')
      .pipe(plugins.babel())
      .pipe(gulp.dest('build/'));
  };
};
