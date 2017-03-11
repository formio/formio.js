module.exports = function(gulp, plugins) {
  let sassFilter = plugins.filter(['*.scss'], {restore: true});
  return function () {
    return gulp.src([
      './node_modules/flatpickr/dist/flatpickr.min.css',
      './node_modules/choices.js/assets/styles/css/choices.min.css',
      './src/sass/formio.form.scss'
    ])
      .pipe(sassFilter)
      .pipe(plugins.sass().on('error', plugins.sass.logError))
      .pipe(sassFilter.restore)
      .pipe(plugins.concat('formio.form.css'))
      .pipe(plugins.replace(/\.\.\/\.\.\/icons\/\/?/g, 'icons/'))
      .pipe(gulp.dest('dist/'))
      .pipe(plugins.rename('formio.form.min.css'))
      .pipe(plugins.cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('dist/'));
  };
};
