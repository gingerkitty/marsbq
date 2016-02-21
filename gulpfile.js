var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var imageMin = require('gulp-imagemin');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');

/* command to watch html template files for changes */
gulp.task('templates', function(){
    var data = {};

    var options = {
        batch: ['src/templates/partials']
    }

    return gulp.src(['src/templates/**/*.hbs','!src/templates/partials/**/*.hbs'])
        .pipe(handlebars(data, options))
        .pipe(rename(function (path){
            path.extname = '.html'
        }))
        .pipe(gulp.dest('./'));
})


/* command to watch image files for changes */
gulp.task('images', function(){
    gulp.src(['src/img/**/*'])
        .pipe(imageMin())
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
})


/* command to watch script files for changes */
gulp.task('scripts', function(){
    gulp.src(['src/scripts/main.js'])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.stream());
})


/* command to watch css files for changes */
gulp.task('styles', function(){
    gulp.src(['src/styles/**/*.css'])
        .pipe(sourcemaps.init())
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.stream());
})

gulp.task('default', ['styles', 'images', 'scripts', 'templates'], function(){
    browserSync.init({
        server: './'
    });

    /* command to watch folder for json and html for changes */
    //gulp.watch('src/**/*', browserSync.reload);
    gulp.watch('src/styles/**/*.css', ['styles']);
    gulp.watch('src/img/**/*', ['images']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/templates/**/*.hbs', ['templates']);
    gulp.watch('*.html', browserSync.reload);

});