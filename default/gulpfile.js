var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
gulp.task('sass',function(){
    gulp.src(['scss/**/*.scss'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(reload())
});
gulp.task('js',function(){
    gulp.src(['js/**/*.js'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('js'))
        .pipe(reload())
});
gulp.task('html',function(){
    gulp.src(['./*.html'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('./'))
        .pipe(reload())
});
gulp.task('default',function(){
    browserSync.init({
        server: "./"
    });
    gulp.watch('js/**/*.js',['js']);
    gulp.watch('scss/**/*.scss',['sass']);
    gulp.watch('./*.html',['html']);
    gulp.watch('img/src/**/*',['image']);
});
