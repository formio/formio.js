module.exports = function(gulp) {
  return function() {
    return gulp
      .src('node_modules/font-awesome/fonts/*')
      .pipe(gulp.dest('dist/fonts'));
  };
};
