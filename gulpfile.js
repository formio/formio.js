'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
plugins.source = require('vinyl-source-stream');
plugins.browserify = require('browserify');
plugins.cleanCSS = require('gulp-clean-css');
gulp.task('clean', require('del').bind(null, ['dist']));
gulp.task('scripts-form', require('./gulp/scripts-form')(gulp, plugins));
gulp.task('scripts', require('./gulp/scripts')(gulp, plugins));
gulp.task('styles', require('./gulp/styles')(gulp, plugins));
gulp.task('watch', require('./gulp/watch')(gulp, plugins));
gulp.task('build', ['clean', 'styles', 'scripts', 'scripts-form']);
gulp.task('default', ['build', 'watch']);
