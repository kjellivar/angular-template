/**
 * Created by storskel on 28.07.2014.
 */
// include gulp
var gulp = require('gulp');

// include plug-ins
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var ngMin = require('gulp-ng-annotate');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var gutil = require('gulp-util');

var paths = {
    scripts: ['./app.js','./js/**/*.js']
};

// JS concat, strip debugging code and minify
gulp.task('bundle-scripts', function() {
    var jsPath = {jsSrc:paths.scripts, jsDest:'./appbuild'};
    gulp.src(jsPath.jsSrc)
        .pipe(concat('myapp.js'))
        .pipe(stripDebug())
        .pipe(ngMin())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(jsPath.jsDest))
        .on('error', gutil.log);
});

gulp.task('default', function () {
    gulp.watch(paths.scripts, ['bundle-scripts']);
});