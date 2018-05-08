'use strict';
var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var plugins = require('gulp-load-plugins')();
const webpack = require('webpack');
const webpack_stream = require('webpack-stream');

// Create wrap template for all built libraries.
var template = '/*! formiojs v<%= version %> | https://unpkg.com/formiojs@<%= version %>/LICENSE.txt */';
template += "\n";
template += '<%= contents %>';
plugins.template = template;

// Get the package.json info for reference during builds.
plugins.packageJson = require('./package.json');
plugins.source = require('vinyl-source-stream');
plugins.browserify = require('browserify');
plugins.cleanCSS = require('gulp-clean-css');

// Clean lib folder.
gulp.task('clean', require('del').bind(null, ['dist', 'lib']));

// Run babel on source code.
gulp.task('babel', require('./gulp/babel')(gulp, plugins));

// Move choices.js icons into dist folder.
gulp.task('icons', () => {
  return gulp.src('node_modules/choices.js/assets/icons/*')
    .pipe(gulp.dest('dist/icons'));
});

// Move font-awesome fonts into dist folder.
gulp.task('builder-fonts', () => {
  return gulp.src('node_modules/font-awesome/fonts/*').pipe(gulp.dest('dist/fonts'));
});

// Generate styles
gulp.task('styles-form', require('./gulp/styles-form')(gulp, plugins));
gulp.task('styles-full', ['builder-fonts'], require('./gulp/styles-full')(gulp, plugins));

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
gulp.task('scripts-form', build('createForm.js', 'formio.form.js'));
gulp.task('scripts-embed', build('formio.embed.js', 'formio.embed.js'));
gulp.task('scripts-contrib', build('contrib/index.js', 'formio.contrib.js'));

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
gulp.task('watch', require('./gulp/watch')(gulp, plugins));

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
