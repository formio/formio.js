'use strict';
var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var plugins = require('gulp-load-plugins')();
const webpack = require('webpack');
const webpack_stream = require('webpack-stream');
plugins.cleanCSS = require('gulp-clean-css');

// Clean lib folder.
gulp.task('clean', require('del').bind(null, ['dist', 'lib']));

// Run babel on source code.
gulp.task('babel', ['eslint'], () => gulp.src(['./src/**/*.js', '!./src/**/*.spec.js'])
  .pipe(plugins.babel())
  .pipe(gulp.dest('lib')));

// Move choices.js icons into dist folder.
gulp.task('icons', () => gulp.src('node_modules/choices.js/assets/icons/*').pipe(gulp.dest('dist/icons')));

// Move font-awesome fonts into dist folder.
gulp.task('builder-fonts', () => gulp.src('node_modules/font-awesome/fonts/*').pipe(gulp.dest('dist/fonts')));

// Generate styles
const compileStyles = (styles, file) => {
  const sassFilter = plugins.filter(['*.scss'], {restore: true});
  return gulp.src(styles)
    .pipe(sassFilter)
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(sassFilter.restore)
    .pipe(plugins.concat(file + '.css'))
    .pipe(plugins.replace(/\.\.\/\.\.\/icons\/\/?/g, 'icons/'))
    .pipe(plugins.replace(/\.\.\/fonts\/\/?/g, 'fonts/'))
    .pipe(gulp.dest('dist'))
    .pipe(plugins.rename(file + '.min.css'))
    .pipe(plugins.cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
};
gulp.task('styles-form', () => compileStyles([
  './node_modules/flatpickr/dist/flatpickr.min.css',
  './node_modules/choices.js/assets/styles/css/choices.min.css',
  './node_modules/dialog-polyfill/dialog-polyfill.css',
  './node_modules/@yaireo/tagify/dist/tagify.css',
  './src/sass/formio.form.scss'
], 'formio.form'));
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
const buildDev = (input, output) => webpack_stream(webpackDev(input, output), webpack).pipe(gulp.dest('dist'));
const buildProd = (input, output) => webpack_stream(webpackProd(input, output), webpack).pipe(gulp.dest('dist'));
const build = (input, output) => {
  const prodFile = output.replace(/\.js$/, '.min.js');
  gulp.task(output, () => buildDev(input, output));
  gulp.task(prodFile, () => buildProd(input, prodFile));
  return [output, prodFile];
};
gulp.task('scripts-formio', build('Formio.js', 'formio.js'));
gulp.task('scripts-utils', build('utils/utils.js', 'formio.utils.js'));
gulp.task('scripts-full', build('index.js', 'formio.full.js'));
gulp.task('scripts-form', build('Form.js', 'formio.form.js'));
gulp.task('scripts-embed', build('formio.embed.js', 'formio.embed.js'));
gulp.task('scripts-contrib', build('contrib/index.js', 'formio.contrib.js'));

// ESLint
const eslintConfig = require('eslint-config-formio');
eslintConfig.parser = 'babel-eslint';
gulp.task('eslint', () => gulp.src(['./src/**/*.js', '!./src/**/*.spec.js'])
  .pipe(plugins.eslint(require('eslint-config-formio')))
  .pipe(plugins.eslint.format())
  .pipe(plugins.eslint.failAfterError())
);

// Copy the version and dependencies into the distribution package.json file.
gulp.task('package-version', function() {
  const pkg = require('./package.json');
  return gulp.src([
    'src/package.json'
  ])
    .pipe(plugins.replace(/"version": ""/, `"version": "${pkg.version}"`))
    .pipe(plugins.replace(/"dependencies": {}/, `"dependencies": ${JSON.stringify(pkg.dependencies)}`))
    .pipe(gulp.dest('lib'));
});

// Copy over the dist folder into the lib folder.
gulp.task('dist', () => gulp.src(['dist/**/*.*']).pipe(gulp.dest('lib/dist')));

// Watch for changes.
gulp.task('watch', () => gulp.watch(['./src/**.js', './src/*/**.js'], ['formio.full.js']));

// Create a new build.
gulp.task('build', gulpsync.sync([['clean'], 'babel', 'package-version', [
  'icons',
  'styles-form',
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
