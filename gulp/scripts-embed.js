module.exports = function(gulp, plugins) {
  return function () {
    return plugins.browserify({
      entries: 'lib/formio.embed.js',
      debug: false
    })
      .bundle()
      .pipe(plugins.source('formio.embed.js'))
      .pipe(plugins.wrap(plugins.template, {version: plugins.packageJson.version}))
      .pipe(gulp.dest('lib/dist'))
      .pipe(plugins.rename('formio.embed.min.js'))
      .pipe(plugins.streamify(plugins.uglify()))
      .pipe(gulp.dest('lib/dist'));
  };
};
