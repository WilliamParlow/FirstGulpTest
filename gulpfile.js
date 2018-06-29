/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

"use strict";
 // Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

// Styles
gulp.task('styles', function () {

    return gulp.src('src/styles/*.scss')
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(notify({
            message: 'Style task complete'
        }));

});

// Scripts
gulp.task('scripts', function () {

    return gulp.src('src/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(rename({
            sufix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(notify({
            message: 'Scripts task complete'
        }));

});

// Images
gulp.task('images', function () {

    return gulp.src('src/images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(notify({
            message: 'Images task complete'
        }));


});

// Clean
gulp.task('clean', function () {

    return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img']);

});

// Default task
gulp.task('default', ['clean'], function () {

    gulp.start('styles', 'scripts', 'images');

});

// Watch
gulp.task('watch', function () {

    gulp.watch('src/styles/**/*.scss', ['styles']);

    gulp.watch('src/scripts/**/*.js', ['scripts']);

    gulp.watch('src/images/**/*', ['images']);

    livereload.listen();

    gulp.watch(['dist/**']).on('change', livereload.changed);

});