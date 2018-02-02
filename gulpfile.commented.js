// We'll be using these gulp plugins for our tasks,
// so we'll require them here.
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// Remember that paths are relative to gulpfile.js,
// which is in the project folder root.

// First, we'll create a task that pertains to all the
// Sass/CSS manipulation we want to do.
// You could run this with the command `gulp styles`,
// but we'll include it in our watch task further down
// so that we don't have to run it individually.
gulp.task('styles', function() {
	// Define our source: .scss files in the /src/scss folder.
    gulp.src('src/scss/**/*.scss')
    	// Initialize the gulp-sourcemaps plugin.
    	// This is to make it easier to debug/find the source
    	// of a particular style as you're building. When you
    	// inspect with dev tools in the browser, you'll see
    	// the .scss file responsible for the style (rather
    	// than just the compiled main.css file, which is the
        // one you'll be referencing).
    	.pipe(sourcemaps.init())
    	// Compile Sass into CSS.
    	// (And if there's an error, log it!)
        .pipe(sass().on('error', sass.logError))
        // Generate an unminified CSS file.
        .pipe(gulp.dest('dist/css/'))
        // Minify the compiled CSS.
        .pipe(cssnano())
        // Write the sourcemap, putting it in the /dist/css
        // folder rather than appending it to the minified
        // CSS file. (We'll add this to our gitignore later.)
        .pipe(sourcemaps.write('.'))
        .pipe(rename(function (path) {
            if(path.extname === '.css') {
                path.basename += '.min';
            }
        }))
        // Define our destination: the /dist/css folder.
        .pipe(gulp.dest('dist/css/'));
});

// Then, we'll create a task that pertains to all the JS
// manipulation we want to do.
// You could run this with the command `gulp scripts`,
// but we'll include this in our watch task further
// down too.
gulp.task('scripts', function() {
	// Define our source: .js files in the /src/js folder.
	return gulp.src('src/js/**/*.js')
		// Initialize the gulp-sourcemaps plugin.
		.pipe(sourcemaps.init())
		// Concatenate (combine) these files into one,
		// called main.js.
		.pipe(concat('main.js'))
		// Generate an unminified JS file.
		.pipe(gulp.dest('dist/js/'))
		// Minify the concatenated JS.
		.pipe(uglify())
        // Write the sourcemap, putting it in the /dist/js
        // folder rather than appending it to the minified
        // JS file.
        .pipe(sourcemaps.write('.'))
        .pipe(rename(function (path) {
            if(path.extname === '.js') {
                path.basename += '.min';
            }
        }))
		// Define our destination: the /dist/js folder.
		.pipe(gulp.dest('dist/js/'));
});

// Now, we'll create our watch task.
// This compiles everything we've set up above,
// so that when we run `gulp`, all of these tasks
// are executed continuously as we make changes.
gulp.task('default',function() {
    gulp.watch('src/scss/**/*.scss',['styles']);
    gulp.watch('src/js/**/*.js',['scripts']);
});
