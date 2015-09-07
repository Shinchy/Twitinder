// Gulp file for campaigns
'use strict';

// Just a simple Gulp File that sorts out the Javascript and the Sass files, this project does not
// require more complexity
var gulp 			= require('gulp');
// CSS
var sass 			= require('gulp-sass');
var prefix 			= require('gulp-autoprefixer');
// Javascript
var babelify 		= require('babelify');
var browserify 		= require('browserify');
var babel 			= require('gulp-babel');
var uglify			= require('gulp-uglify');
// Files and Tasks
var source 			= require('vinyl-source-stream');
var buffer 			= require('vinyl-buffer');
var concatinate		= require('gulp-concat');
var browserSync 	= require('browser-sync');
var path 			= require('path');
var karma 			= require('gulp-karma');



// Global
// Error handling
function errorLog( $err )
{
	console.log( $err );
	browserSync.notify( '<span style="file-size: 18px;">Error : ' + $err + '</span>', 10000 );
	this.emit('end');
}

// De-caching for Data files
function requireUncached( $module ) {
	delete require.cache[require.resolve( $module )];
	return require( $module );
}

// Run the browser sync
function watchAll() {
	// Browser Sync Server runing on port 3030
	browserSync.init({
		server: './client',
		port: 3030
	});
	// Watch the JS and the Sass files
	gulp.watch( './app/**/*.scss', ['sass'] );
	gulp.watch( './app/**/*.js', ['scripts'] );
	gulp.watch( ['./app/**/*.js', './tests/*.spec.js'], ['test'] );
};

// Test runner function
function testUsingKarma() {	
	return gulp.src([
		'test/**/*.spec.js'
	])
		.pipe(karma({
			configFile: 'karma.conf.js',
			action: 'run'
		}))
		.on('error', errorLog);
}



// Gulp Tasks
// Sass Runner
gulp.task('sass', function() {
	gulp.src('./app/scss/**/*.scss')
		.pipe( sass({ outputStyle: 'compressed' }) )
		.on('error', errorLog )
		.pipe( prefix({
			browser: ['last 2 versions']
		}))
		.pipe( gulp.dest('./client/css') )
		.pipe( browserSync.stream() );
});

// Scripts runner, converts from ES6 then compresses file down
gulp.task('scripts', function() {	
	// Set up the Browserify, Babel and Uglfy :/
	return browserify({
			entries: './app/js/twitinder-main.js',
			debug: true
		})
		.on('error', errorLog )
		.transform(babelify)
		.bundle()
		.on('error', errorLog )
		.pipe( source('twitinder-main.js') )
		.pipe( buffer() )
		.pipe( uglify() )
		.pipe( gulp.dest('./client/js') )
		.pipe( browserSync.stream() );
});

// Gulp Karma Test Runner
gulp.task('test', testUsingKarma);



// Default task runner for Gulp
gulp.task('default', ['scripts','sass']);

// Runner
gulp.task('watch', ['scripts','sass','test'], watchAll);
gulp.task('watch-q', [], watchAll); // Quick watcher