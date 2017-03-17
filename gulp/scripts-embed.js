module.exports = function(gulp, plugins) {
  return function () {
    return plugins.browserify({
      entries: './build/formio.embed.js',
      debug: false
    })
      .bundle()
      .pipe(plugins.source('formio.embed.js'))
      .pipe(gulp.dest('dist/'))
      .pipe(plugins.rename('formio.embed.min.js'))
      .pipe(plugins.streamify(plugins.uglify()))
      .pipe(gulp.dest('dist/'));
  };
};
