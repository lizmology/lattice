var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('styles', function() {
    gulp.src('src/scss/**/*.scss')
    	.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css/'))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(rename(function (path) {
            if(path.extname === '.css') {
                path.basename += '.min';
            }
        }))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('scripts', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/js/'))
		.pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(rename(function (path) {
            if(path.extname === '.js') {
                path.basename += '.min';
            }
        }))
		.pipe(gulp.dest('dist/js/'));
});

gulp.task('default',function() {
    gulp.watch('src/scss/**/*.scss',['styles']);
    gulp.watch('src/js/**/*.js',['scripts']);
});
