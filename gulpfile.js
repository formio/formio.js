'use strict';
const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const babel = require('gulp-babel');
const filter = require('gulp-filter');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const eslint = require('gulp-eslint');

// Clean publish files.
gulp.task('clean', require('del').bind(null, [
  'dist',
  'lib',
  'components',
  'contrib',
  'providers',
  'resources',
  'templates',
  'utils',
  'widgets',
  'Element.js',
  'EventEmitter.js',
  'Form.js',
  'FormBuilder.js',
  'formio.embed.js',
  'formio.form.js',
  'Formio.js',
  'i18n.js',
  'index.js',
  'pdf.image.js',
  'PDF.js',
  'PDFBuilder.js',
  'Webform.js',
  'WebformBuilder.js',
  'Wizard.js',
  'WizardBuilder.js',
]));

// ESLint
gulp.task('eslint', function eslintTask() {
  return gulp.src(['./src/**/*.js', '!./src/**/*.spec.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Run babel on source code.
gulp.task('babel', gulp.series('eslint', function babelTask() {
  return gulp.src(['./src/**/*.js', '!./src/**/*.spec.js'])
    .pipe(babel())
    .pipe(gulp.dest('.'));
}));

// Move font-awesome fonts into dist folder.
gulp.task('builder-fonts', function builderFonts() {
  return gulp.src('node_modules/font-awesome/fonts/*').pipe(gulp.dest('dist/fonts'));
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
gulp.task('styles-form', function formStyles() {
  return compileStyles([
    './node_modules/flatpickr/dist/flatpickr.min.css',
    './node_modules/choices.js/public/assets/styles/choices.min.css',
    './node_modules/dialog-polyfill/dialog-polyfill.css',
    './src/sass/formio.form.scss'
  ], 'formio.form');
});
gulp.task('styles-builder', function builderStyles() {
  return compileStyles([
    './node_modules/flatpickr/dist/flatpickr.min.css',
    './node_modules/choices.js/public/assets/styles/choices.min.css',
    './node_modules/dialog-polyfill/dialog-polyfill.css',
    './node_modules/dragula/dist/dragula.css',
    './src/sass/formio.form.scss',
    './src/sass/formio.form.builder.scss'
  ], 'formio.builder');
});
gulp.task('styles-full', gulp.series('builder-fonts', function fullStyles() {
  return compileStyles([
    './node_modules/flatpickr/dist/flatpickr.min.css',
    './node_modules/choices.js/public/assets/styles/choices.min.css',
    './node_modules/dialog-polyfill/dialog-polyfill.css',
    './node_modules/dragula/dist/dragula.css',
    './node_modules/font-awesome/css/font-awesome.css',
    './src/sass/formio.form.scss',
    './src/sass/formio.form.builder.scss'
  ], 'formio.full');
}));

// Script builds.
const webpackDev = require('./config/webpack.dev');
const webpackProd = require('./config/webpack.prod');
const buildDev = (input, output) => webpackStream(webpackDev(input, output), webpack).pipe(gulp.dest('dist'));
const buildProd = (input, output) => webpackStream(webpackProd(input, output), webpack).pipe(gulp.dest('dist'));
const build = (input, output) => {
  const prodFile = output.replace(/\.js$/, '.min.js');
  gulp.task(output, () => buildDev(input, output));
  gulp.task(prodFile, () => buildProd(input, prodFile));
  return gulp.parallel(output, prodFile);
};
gulp.task('scripts-formio', build('Formio.js', 'formio.js'));
gulp.task('scripts-utils', build('utils/utils.js', 'formio.utils.js'));
gulp.task('scripts-full', build('index.js', 'formio.full.js'));
gulp.task('scripts-form', build('formio.form.js', 'formio.form.js'));
gulp.task('formio.embed.min.js', () => buildProd('formio.embed.js', 'formio.embed.min.js'));
gulp.task('formio.embed.js', () =>
  gulp.src('./dist/formio.embed.min.js')
    .pipe(rename('formio.embed.js'))
    .pipe(gulp.dest('dist')));
gulp.task('scripts-embed', gulp.series('formio.embed.min.js', 'formio.embed.js'));
gulp.task('scripts-contrib', build('contrib/index.js', 'formio.contrib.js'));

gulp.task('jquery', () => gulp.src('./node_modules/jquery/dist/**/*.*').pipe(gulp.dest('./app/jquery')));
gulp.task('fontawesome', () => gulp.src('./node_modules/font-awesome/**/*.*').pipe(gulp.dest('./app/fontawesome')));
gulp.task('bootstrap', () => gulp.src('./node_modules/bootstrap/dist/**/*.*').pipe(gulp.dest('./app/bootstrap')));
gulp.task('bootswatch', () => gulp.src('./node_modules/bootswatch/**/*.*').pipe(gulp.dest('./app/bootswatch')));

// Watch for changes.
gulp.task('watch', () => gulp.watch(['./src/*.js', './src/**/*.js'], gulp.series('scripts-full')));

// Copy over the moment-timezones to the resource folder.
gulp.task('timezones', () => gulp.src('./node_modules/moment-timezone/data/packed/latest.json').pipe(gulp.dest('./resources')));

// Create a new build.
gulp.task('build', gulp.series(
  'babel',
  gulp.parallel(
    'jquery',
    'timezones',
    'fontawesome',
    'bootstrap',
    'bootswatch'
  ),
  gulp.parallel(
    'styles-form',
    'styles-builder',
    'styles-full',
    'scripts-formio',
    'scripts-utils',
    'scripts-embed',
    'scripts-contrib',
    'scripts-form',
    'scripts-full'
  ),
));

// Default task. Build and watch.
gulp.task('default', gulp.series('babel', 'scripts-full', 'watch'));
