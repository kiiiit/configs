var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  plumber = require('gulp-plumber'),
  sass = require('gulp-sass'),
  prefixer = require('gulp-autoprefixer'),
  imgmin = require('gulp-imagemin'),
  csscomb = require('gulp-csscomb');


gulp.task('sass',()=>{
  gulp.src(['src/**/*.scss'])
  .pipe(plumber({
    handleError: (err)=>{
      console.log(err);
      this.emit('end');
    }
  }))
  .pipe(prefixer({
    browsers: ["last 2 versions", "ie >= 8", "Android >= 4","ios_saf >= 6"],
    cascade: false
  }))
  .pipe(sass())
  .pipe(csscomb())
  .pipe(gulp.dest('dest/'))
});

gulp.task('js',()=>{
  gulp.src(['src/**/*.js'])
  .pipe(plumber({
    handleError: (err)=>{
      console.log(err);
      this.emit('end');
    }
  }))
  .pipe(gulp.dest('dest/'))
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
});

gulp.task('imgmin',()=>{
  gulp.src(['src/**/images/*'])
  .pipe(plumber({
    handleError: (err)=>{
      console.log(err);
      this.emit('end');
    }
  }))
  .pipe(imgmin())
  .pipe(gulp.dest('dest/'))
});

gulp.task('reload',()=>{
  browserSync.reload()
})

gulp.task('default',()=>{
  browserSync.init({
    server: "./dest/"
  });
  gulp.watch('src/**/*.js',['js','reload']);
  gulp.watch('src/**/*.scss',['sass','reload']);
  gulp.watch('src/**/*.html',['html','reload']);
});
