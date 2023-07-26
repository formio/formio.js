'use strict';
const gulp = require('gulp');
const filter = require('gulp-filter');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const eslint = require('gulp-eslint');
const clean = require('gulp-clean');

// Clean lib folder.
gulp.task('clean:dist', () => {
  return gulp.src('dist', { read: false, allowEmpty: true }).pipe(clean());
});
gulp.task('clean:lib', () => {
  return gulp.src('lib', { read: false, allowEmpty: true }).pipe(clean());
});
gulp.task('clean', gulp.parallel('clean:dist', 'clean:lib'));

// ESLint
gulp.task('eslint', function eslintTask() {
  return gulp.src(['./src/**/*.js', '!./src/**/*.spec.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Move font-awesome fonts into dist folder.
gulp.task('builder-fonts', function builderFonts() {
  return gulp.src('./node_modules/bootstrap-icons/font/fonts/*').pipe(gulp.dest('dist/fonts'));
});

// Generate styles
const compileStyles = (styles, file) => {
  const sassFilter = filter('**/*.scss', { restore: true });
  return gulp.src(styles)
    .pipe(sassFilter)
    .pipe(sass().on('error', sass.logError))
    .pipe(sassFilter.restore)
    .pipe(concat(`${file}.css`))
    .pipe(replace(/\.\.\/\.\.\/icons\/\/?/g, 'icons/'))
    /* eslint-disable quotes */
    .pipe(replace('icons/cross.svg', `'data:image/svg+xml;charset=utf8,%3Csvg width="21" height="21" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23FFF" fill-rule="evenodd"%3E%3Cpath d="M2.592.044l18.364 18.364-2.548 2.548L.044 2.592z"/%3E%3Cpath d="M0 18.364L18.364 0l2.548 2.548L2.548 20.912z"/%3E%3C/g%3E%3C/svg%3E'`))
    .pipe(replace('icons/cross-inverse.svg', `'data:image/svg+xml;charset=utf8,%3Csvg width="21" height="21" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23000" fill-rule="evenodd"%3E%3Cpath d="M2.592.044l18.364 18.364-2.548 2.548L.044 2.592z"/%3E%3Cpath d="M0 18.364L18.364 0l2.548 2.548L2.548 20.912z"/%3E%3C/g%3E%3C/svg%3E'`))
    /* eslint-enable quotes */
    .pipe(replace(/\.\.\/fonts\/\/?/g, 'fonts/'))
    .pipe(gulp.dest('dist'))
    .pipe(rename(`${file}.min.css`))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist'));
};
gulp.task('styles-embed', function embedStyles() {
  return compileStyles([
    './src/sass/formio.embed.scss'
  ], 'formio.embed');
});
gulp.task('styles-form', function formStyles() {
  return compileStyles([
    './node_modules/@formio/choices.js/public/assets/styles/choices.css',
    './node_modules/tippy.js/dist/tippy.css',
    './node_modules/dialog-polyfill/dialog-polyfill.css',
    './src/sass/formio.form.scss'
  ], 'formio.form');
});
gulp.task('styles-builder', function builderStyles() {
  return compileStyles([
    './node_modules/@formio/choices.js/public/assets/styles/choices.css',
    './node_modules/tippy.js/dist/tippy.css',
    './node_modules/dialog-polyfill/dialog-polyfill.css',
    './node_modules/dragula/dist/dragula.css',
    './src/sass/formio.form.scss',
    './src/sass/formio.form.builder.scss'
  ], 'formio.builder');
});
gulp.task('styles-full', gulp.series('builder-fonts', function fullStyles() {
  return compileStyles([
    './node_modules/@formio/choices.js/public/assets/styles/choices.min.css',
    './node_modules/tippy.js/dist/tippy.css',
    './node_modules/dialog-polyfill/dialog-polyfill.css',
    './node_modules/dragula/dist/dragula.css',
    './node_modules/bootstrap-icons/font/bootstrap-icons.css',
    './src/sass/formio.form.scss',
    './src/sass/formio.form.builder.scss'
  ], 'formio.full');
}));

gulp.task('icons', () => gulp.src('./node_modules/bootstrap-icons/**/*.*').pipe(gulp.dest('./app/bootstrap-icons')));
gulp.task('bootstrap', () => gulp.src('./node_modules/bootstrap/dist/**/*.*').pipe(gulp.dest('./app/bootstrap')));
gulp.task('bootswatch', () => gulp.src('./node_modules/bootswatch/**/*.*').pipe(gulp.dest('./app/bootswatch')));

// Copy over the moment-timezones to the resource folder.
gulp.task('timezones', () => gulp.src('./node_modules/moment-timezone/data/packed/latest.json').pipe(gulp.dest('./resources')));

// Create a new build.
gulp.task('build', gulp.series(
  gulp.parallel(
    'timezones',
    'icons',
    'bootstrap',
    'bootswatch'
  ),
  gulp.parallel(
    'styles-embed',
    'styles-form',
    'styles-builder',
    'styles-full'
  )
));
