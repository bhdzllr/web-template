var gulp = require('gulp');
var del  = require('del');
var removeCode = require('gulp-remove-code');

var pkg  = require('./package.json');
var dirs = pkg['web-template-configs'].directories;

console.log('Version ' + pkg.version);

gulp.task('default', ['clean:after']);

gulp.task('clean:before', function () {
	return del([
		dirs.dist + '/**/*', // `**/*` everything inside the folder
	]);
});

gulp.task('copy', ['clean:before'], function () {
	gulp.src(['node_modules/jquery/dist/jquery.min.js'])
		.pipe(gulp.dest(dirs.src + '/js/vendor/'));

	return gulp.src([dirs.src + '/**/*', dirs.src + '/.*'])
		.pipe(gulp.dest(dirs.dist + '/'));
});

gulp.task('modify', ['copy'], function () {
	gulp.src(dirs.src + '/.htaccess')
		.pipe(removeCode({ production: true, commentStart: '#', commentEnd: '' }))
		.pipe(gulp.dest(dirs.dist + '/'));

	gulp.src(dirs.src + '/index.html')
		.pipe(removeCode({ production: true }))
		.pipe(gulp.dest(dirs.dist + '/'));

	gulp.src(dirs.src + '/css/style.css')
		.pipe(removeCode({ production: true, commentStart: '/*', commentEnd: '*/' }))
		.pipe(gulp.dest(dirs.dist + '/css/'));

	return gulp.src(dirs.src + '/js/main.js')
		.pipe(removeCode({ production: true }))
		.pipe(gulp.dest(dirs.dist + '/js/'));
});

gulp.task('clean:after', ['modify'], function () {
	return del([
		dirs.dist + '/standalone.html',
		// dirs.dist + '/img/*',
		dirs.dist + '/img/icons',
		dirs.dist + '/img/mobile',
		dirs.dist + '/fonts',
		// dirs.dist + '/js/vendor/plugins.min.js'
	]);
});
