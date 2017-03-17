module.exports = function(gulp, plugins) {
  return function () {
    return gulp.src('./src/**/*.js')
      .pipe(plugins.babel({
        presets: ['es2015']
      }))
      .pipe(gulp.dest('build/'));
  };
};
