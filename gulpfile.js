'use strict';
var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var plugins = require('gulp-load-plugins')();
plugins.source = require('vinyl-source-stream');
plugins.browserify = require('browserify');
plugins.cleanCSS = require('gulp-clean-css');
gulp.task('clean', require('del').bind(null, ['dist', 'lib']));
gulp.task('babel', require('./gulp/babel')(gulp, plugins));
gulp.task('scripts-form', require('./gulp/scripts-form')(gulp, plugins));
gulp.task('scripts-full', require('./gulp/scripts-full')(gulp, plugins));
gulp.task('scripts-utils', require('./gulp/scripts-utils')(gulp, plugins));
gulp.task('scripts-wizard', require('./gulp/scripts-wizard')(gulp, plugins));
gulp.task('scripts-embed', require('./gulp/scripts-embed')(gulp, plugins));
gulp.task('scripts-contrib', require('./gulp/scripts-contrib')(gulp, plugins));
gulp.task('scripts', require('./gulp/scripts')(gulp, plugins));
gulp.task('icons', () => {
  return gulp.src('node_modules/choices.js/assets/icons/*')
    .pipe(gulp.dest('dist/icons'));
});
gulp.task('styles', require('./gulp/styles')(gulp, plugins));
gulp.task('watch', require('./gulp/watch')(gulp, plugins));
gulp.task('build', gulpsync.sync([['clean'], 'babel', ['icons', 'styles', 'scripts', 'scripts-utils', 'scripts-form', 'scripts-wizard', 'scripts-embed', 'scripts-contrib', 'scripts-full']]));
gulp.task('default', ['build', 'watch']);
