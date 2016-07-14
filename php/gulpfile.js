var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var connect = require('gulp-connect-php');

gulp.task('sass',() => {
    gulp.src(['scss/**/*.scss'])
        .pipe(plumber({
            handleError: (err) => {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(reload())
});

gulp.task('js',() => {
    gulp.src(['js/**/*.js'])
        .pipe(plumber({
            handleError: (err) => {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('js'))
        .pipe(reload())
});

gulp.task('html',() => {
    gulp.src(['./*.html'])
        .pipe(plumber({
            handleError: (err) => {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('./'))
        .pipe(reload())
});

gulp.task('connect-sync', () =>  {
    connect.server({}, () => {
        browserSync({
            proxy: '127.0.0.1:8000'
        });
    });

    gulp.watch('**/*.php').on('change', () => {
        reload();
    });

});

gulp.task('default', ['connect-sync'], () => {
    gulp.watch('js/**/*.js',['js']);
    gulp.watch('scss/**/*.scss',['sass']);
    gulp.watch('./**/*.html',['html']);
});
