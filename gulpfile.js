'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
plugins.source = require('vinyl-source-stream');
plugins.browserify = require('browserify');

gulp.task('clean', require('del').bind(null, ['dist']));
gulp.task('scripts', require('./gulp/scripts')(gulp, plugins));
gulp.task('watch', require('./gulp/watch')(gulp, plugins));
gulp.task('build', ['clean', 'scripts']);
gulp.task('default', ['build', 'watch']);
