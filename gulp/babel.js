module.exports = function(gulp, plugins) {
  return function () {
    return gulp.src('./src/**/*.js')
      .pipe(plugins.babel({
        presets: ['env']
      }))
      .pipe(gulp.dest('build/'));
  };
};
