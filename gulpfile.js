// Gulp file for campaigns
'use strict';

// Just a simple Gulp File that sorts out the Javascript and the Sass files, this project does not
// require more complexity
var gulp 			= require('gulp');
var sass 			= require('gulp-sass');
var uglify			= require('gulp-uglify');
var prefix 			= require('gulp-autoprefixer');
var babel 			= require('gulp-babel');
var concatinate		= require('gulp-concat');
var browserSync 	= require('browser-sync');
var path 			= require('path');

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

// Sass Task Runner
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

// Scripts runner, converts from ES6 then compresses file
gulp.task('scripts', function() {
	gulp.src('./app/js/**/*.js')
		.pipe( babel() )
		.on('error', errorLog )
		.pipe( concatinate( 'hub.min.js' ) )
		.pipe( uglify() )		
		.pipe( gulp.dest('./client/js') )
		.pipe( browserSync.stream() );
});

// Runner
gulp.task('watch', ['scripts','sass','css'], watchAll);
gulp.task('watch-q', [], watchAll);

function watchAll() {
	// Run the browser sync
	// Browser Sync Server runing on port 3030
	browserSync.init({
		server: './client',
		port: 3030
	});
	// Watch the JS and the Sass files
	gulp.watch( './app/**/*.scss', ['sass'] );
	gulp.watch( './app/**/*.js', ['scripts'] );
};

// Default task runner for Gulp
gulp.task('default', ['scripts','sass']);

