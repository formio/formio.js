module.exports = function(gulp, plugins) {
  return function() {
    gulp.watch(['./src/**.js'], ['build']);
  }
};
