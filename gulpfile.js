// Gulp file for campaigns
'use strict';

var gulp 			= require('gulp');
var sass 			= require('gulp-sass');
var minifycss 		= require('gulp-minify-css');
var uglify			= require('gulp-uglify');
var prefix 			= require('gulp-autoprefixer');
var babel 			= require('gulp-babel');
var concatinate		= require('gulp-concat');
var rename 			= require('gulp-rename');
var imagemin 		= require('gulp-imagemin');
var filesize		= require('gulp-filesize');
var data 			= require('gulp-data');
var browserSync 	= require('browser-sync');
var jshintstylish 	= require('jshint-stylish');
var path 			= require('path');
var del 			= require('del');

// Global
// Can be set either Dynamically using a date stamp or set manually by overriding the below with a string.
var _imageFolderName = '2015_08_Revlon';

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

// Browser Sync Server runing on default 3000 //


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

// CSS Copy Task Runner
gulp.task('css', function() {
	gulp.src('./app/css/**/*.css')
		.pipe( prefix({
			browser: ['last 2 versions']
		}))
		.pipe(minifycss({compatibility: 'ie8'}))		
		.on('error', errorLog )
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

// Clear out metadata from Photohshop Images
gulp.task('images', function() {
	// del(['./client/'+_imageFolderName+'/'], function(err,paths) {
	// 	console.log('deleted files from ' + _imageFolderName + '.');
	// });
	gulp.src('./app/images/**/*')
		.pipe( imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}]
		}))
		.pipe(gulp.dest('./client/' + _imageFolderName + '/' ));
});
// watch for image changes (this can be temprimental) only useful if you are not renaming images or anything
gulp.task('imagewatch', ['images'], function() {
	gulp.watch( './app/images/**/*', ['images'] );
});



// Template language compiler for taking Jade templates and moving them over to HTML files
// gulp.task('templates',function() {
	
// 	var YOUR_LOCALS = {};

// 	gulp.src('./app/views/*.jade')
// 		.pipe( data(function(file){
// 			return requireUncached('./app/views/data/main.json');
// 		}))
// 		.on('error', errorLog )
// 		.pipe( jade({
// 			pretty: true
// 		}))
// 		.on('error', errorLog )
// 		.pipe( gulp.dest('./client/') )
// 		.pipe( browserSync.stream() );
// });


// Runner
gulp.task('watch', ['scripts','sass','css'], function() {
	// Run the browser sync
	browserSync.init({
		server: './client'
	});
	gulp.watch( './app/**/*.scss', ['sass'] );
	gulp.watch( './app/**/*.css', ['css'] );
	gulp.watch( './app/**/*.js', ['scripts'] );
	// gulp.watch( './app/**/*.jade', ['templates'] );
	// gulp.watch( ['./app/**/*.json','./app/**/*.html'], ['templates'] );
});

gulp.task('watch-q', [], function() {
	// Run the browser sync
	browserSync.init({
		server: './client'
	});
	gulp.watch( './app/**/*.scss', ['sass'] );
	gulp.watch( './app/**/*.css', ['css'] );
	gulp.watch( './app/**/*.js', ['scripts'] );
	// gulp.watch( './app/**/*.jade', ['templates'] );
	// gulp.watch( ['./app/**/*.json','./app/**/*.html'], ['templates'] );
});

// Default task runner for Gulp
gulp.task('default', ['scripts','sass']);