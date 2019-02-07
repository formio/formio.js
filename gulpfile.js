'use strict';
const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const sync = require('gulp-sync')(gulp);
const babel = require('gulp-babel');
const filter = require('gulp-filter');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const eslint = require('gulp-eslint');

// Clean lib folder.
gulp.task('clean', require('del').bind(null, ['dist', 'lib']));

// Run babel on source code.
gulp.task('babel', ['eslint'], () => gulp.src(['./src/**/*.js', '!./src/**/*.spec.js'])
  .pipe(babel({
    presets: ['@babel/env'],
    plugins: ['@babel/plugin-proposal-export-default-from']
  }))
  .pipe(gulp.dest('lib')));

// Move font-awesome fonts into dist folder.
gulp.task('builder-fonts', () => gulp.src('node_modules/font-awesome/fonts/*').pipe(gulp.dest('dist/fonts')));

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
gulp.task('styles-form', () => compileStyles([
  './node_modules/flatpickr/dist/flatpickr.min.css',
  './node_modules/choices.js/assets/styles/css/choices.min.css',
  './node_modules/dialog-polyfill/dialog-polyfill.css',
  './node_modules/@yaireo/tagify/dist/tagify.css',
  './src/sass/formio.form.scss'
], 'formio.form'));
gulp.task('styles-builder', () => compileStyles([
  './node_modules/flatpickr/dist/flatpickr.min.css',
  './node_modules/choices.js/assets/styles/css/choices.min.css',
  './node_modules/dialog-polyfill/dialog-polyfill.css',
  './node_modules/@yaireo/tagify/dist/tagify.css',
  './node_modules/dragula/dist/dragula.css',
  './src/sass/formio.form.scss',
  './src/sass/formio.form.builder.scss'
], 'formio.builder'));
gulp.task('styles-full', ['builder-fonts'], () => compileStyles([
  './node_modules/flatpickr/dist/flatpickr.min.css',
  './node_modules/choices.js/assets/styles/css/choices.min.css',
  './node_modules/dialog-polyfill/dialog-polyfill.css',
  './node_modules/@yaireo/tagify/dist/tagify.css',
  './node_modules/dragula/dist/dragula.css',
  './node_modules/font-awesome/css/font-awesome.css',
  './src/sass/formio.form.scss',
  './src/sass/formio.form.builder.scss'
], 'formio.full'));

// Script builds.
const webpackDev = require('./config/webpack.dev');
const webpackProd = require('./config/webpack.prod');
const buildDev = (input, output) => webpackStream(webpackDev(input, output), webpack).pipe(gulp.dest('dist'));
const buildProd = (input, output) => webpackStream(webpackProd(input, output), webpack).pipe(gulp.dest('dist'));
const build = (input, output) => {
  const prodFile = output.replace(/\.js$/, '.min.js');
  gulp.task(output, () => buildDev(input, output));
  gulp.task(prodFile, () => buildProd(input, prodFile));
  return [output, prodFile];
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
gulp.task('scripts-embed', sync.sync([['formio.embed.min.js'], 'formio.embed.js']));
gulp.task('scripts-contrib', build('contrib/index.js', 'formio.contrib.js'));

// ESLint
gulp.task('eslint', () => gulp.src(['./src/**/*.js', '!./src/**/*.spec.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
);

gulp.task('jquery', () => gulp.src('./node_modules/jquery/dist/**/*.*').pipe(gulp.dest('./app/jquery')));
gulp.task('fontawesome', () => gulp.src('./node_modules/font-awesome/**/*.*').pipe(gulp.dest('./app/fontawesome')));
gulp.task('bootstrap', () => gulp.src('./node_modules/bootstrap/dist/**/*.*').pipe(gulp.dest('./app/bootstrap')));
gulp.task('bootswatch', () => gulp.src('./node_modules/bootswatch/**/*.*').pipe(gulp.dest('./app/bootswatch')));

// Copy the version and dependencies into the distribution package.json file.
gulp.task('package-version', function() {
  const pkg = require('./package.json');
  return gulp.src([
    'src/package.json'
  ])
    .pipe(replace(/"version": ""/, `"version": "${pkg.version}"`))
    .pipe(replace(/"dependencies": {}/, `"dependencies": ${JSON.stringify(pkg.dependencies)}`))
    .pipe(gulp.dest('lib'));
});

// Copy over the dist folder into the lib folder.
gulp.task('dist', () => gulp.src(['dist/**/*.*']).pipe(gulp.dest('lib/dist')));

// Watch for changes.
gulp.task('watch', () => gulp.watch(['./src/**.js', './src/*/**.js'], ['formio.full.js']));

// Create a new build.
gulp.task('build', sync.sync([['clean'], 'babel', 'package-version', [
  'jquery',
  'fontawesome',
  'bootstrap',
  'bootswatch',
  'styles-form',
  'styles-builder',
  'styles-full',
  'scripts-formio',
  'scripts-utils',
  'scripts-embed',
  'scripts-contrib',
  'scripts-form',
  'scripts-full'
], 'dist']));

// Default task. Build and watch.
gulp.task('default', ['babel', 'scripts-full', 'watch']);
