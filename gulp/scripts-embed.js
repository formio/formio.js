module.exports = function(gulp, plugins) {
  return function () {
    return plugins.browserify({
      entries: './src/formio.embed.js',
      debug: false
    })
      .transform('babelify', {presets: ['es2015']})
      .bundle()
      .pipe(plugins.source('formio.embed.js'))
      .pipe(gulp.dest('dist/'))
      .pipe(plugins.rename('formio.embed.min.js'))
      .pipe(plugins.streamify(plugins.uglify()))
      .pipe(gulp.dest('dist/'));
  };
};
