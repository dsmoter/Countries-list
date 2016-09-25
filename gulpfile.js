var gulp = require('gulp');
var webserver = require('gulp-webserver');
var connect = require('gulp-connect');

gulp.task('webserv', function() {
	connect.server({
		livereload: true
	});
})
 
gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});