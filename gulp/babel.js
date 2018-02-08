module.exports = function(gulp, plugins) {
  return function () {
    return gulp.src(['./src/**/*.js', '!./src/**/*.spec.js'])
      .pipe(plugins.babel())
      .pipe(gulp.dest('lib/'));
  };
};
