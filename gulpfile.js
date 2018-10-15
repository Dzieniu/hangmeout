var gulp = require('gulp');  
var nodemon = require('gulp-nodemon');  
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
livereload = require('gulp-livereload');


gulp.task('sass', function () {
    return gulp.src('./public/stylesheets/scss/*.scss',{sourcemap: true})
        .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write('maps', {
        includeContent: false,
        sourceRoot: 'source'
    }))
      .pipe(gulp.dest('./public/stylesheets/css/'))
      .pipe(livereload());
  });

gulp.task('watch', function() {  
  livereload.listen();
  browserSync.init({
    proxy: "http://localhost:3000",
    port: 7000,
  })
    gulp.watch('./public/stylesheets/scss/*.scss', ['sass']);
    gulp.watch('./public/javascripts/*.js', browserSync.reload);
    gulp.watch('./views/*.ejs', browserSync.reload);
});


gulp.task('server',function(){  
    nodemon({
        'script': 'app.js',
    });
});

gulp.task('serve', ['server','watch']);  