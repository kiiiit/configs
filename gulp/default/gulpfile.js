var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    prefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    imagemin = require('gulp-imagemin');


gulp.task('sass',()=>{
    gulp.src(['src/**/*.scss'])
        .pipe(plumber({
            handleError: (err)=>{
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(prefixer({
            browsers: ["last 2 versions", "ie >= 8", "Android >= 2","ios_saf >= 6"],
            cascade: false
        }))
        .pipe(sass())
        .pipe(gulp.dest('dest/'))
        .pipe(reload())
});
gulp.task('js',()=>{
    gulp.src(['src/**/*.js'])
        .pipe(plumber({
            handleError: (err)=>{
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dest/'))
        .pipe(reload())
});
gulp.task('html',()=>{
    gulp.src(['src/**/*.html'])
        .pipe(plumber({
            handleError: (err)=>{
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('dest/'))
        .pipe(reload())
});
gulp.task('imagemin',()=>{
    gulp.src(['src/**/images/*'])
    .pipe(plumber({
        handleError: (err)=>{
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(imagemin())
    .pipe(gulp.dest('dest/'))
    .pipe(reload())
});

gulp.task('default',()=>{
    browserSync.init({
        server: "dest/tv/"
    });
    gulp.watch('src/**/*.js',['js']);
    gulp.watch('src/**/*.scss',['sass']);
    gulp.watch('src/**/*.html',['html']);
    gulp.watch('src/**/images/',['imagemin']);
});
