module.exports = function(gulp, plugins) {
  return function() {
    gulp.watch(['./src/**.js', './src/*/**.js'], ['formio.full.js']);
  }
};
