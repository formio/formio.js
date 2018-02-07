module.exports = function(gulp, plugins) {
  return function () {
    return gulp.src('./src/**/*.js')
      .pipe(plugins.if('formio.js', plugins.babel({
        plugins: [
          'lodash'
        ]
      }), plugins.babel()))
      .pipe(gulp.dest('build/'));
  };
};
