var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var prefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');

gulp.task('sass',() => {
    gulp.src(['scss/**/*.scss'])
        .pipe(plumber({
            handleError: (err) => {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(prefixer({
            browsers: ["last 2 versions", "ie >= 8", "Android >= 2","ios_saf >= 6"],
            cascade: false
        }))
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(reload())
});

gulp.task('es6',() => {
    gulp.src(['es6/**/*.js'])
        .pipe(plumber({
            handleError: (err) => {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(babel({
            presets: ['es2015']
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


gulp.task('default',() => {
    browserSync.init({
        server: "./"
    });
    gulp.watch('es6/**/*.js',['es6']);
    gulp.watch('scss/**/*.scss',['sass']);
    gulp.watch('./**/*.html',['html']);
});
