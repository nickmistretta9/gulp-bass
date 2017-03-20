var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	postcss = require('gulp-postcss'),
	php = require('gulp-connect-php'),
	useref = require('gulp-useref'),
	reload = browserSync.reload,
	uglify = require('gulp-uglify'),
	cssnano = require('gulp-cssnano'),
	gulpIf = require('gulp-if'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	del = require('del'),
	runSequence = require('run-sequence');

gulp.task('clean:dist', function() {
	return del.sync('dist');
});

gulp.task('images', function() {
	return gulp.src('dev/images/**/*.+(png|jpg|gif|svg)')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
	return gulp.src('dev/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
});

gulp.task('useref', function() {
	return gulp.src('dev/**/*.php')
	.pipe(useref({searchPath: 'dev' }))
	.pipe(gulpIf('*.js', uglify()))
	.pipe(gulpIf('*.css', cssnano()))
	.pipe(gulp.dest('dist'))
});

gulp.task('php', function() {
	php.server({base: 'dev', port: 8010, keepalive:true});
});

gulp.task('autoprefixer', function() {
	return gulp.src('dev/src/*.css')
	.pipe(postcss([autoprefixer()]))
	.pipe(gulp.dest('dist/css'));
});

gulp.task('browser-sync', ['php'], function() {
	browserSync({
		proxy: '127.0.0.1:8010',
		port:8010,
		open:true,
		notify:false
	});
});


gulp.task('sass', function() {
	return gulp.src('dev/scss/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('dev/css'))
	.pipe(reload({
		stream:true
	}))
});

gulp.task('build', function (callback) {
	runSequence('clean:dist', ['sass', 'useref', 'images', 'fonts'], callback) 
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
	gulp.watch('dev/scss/**/*.scss', ['sass'], reload);
	gulp.watch('dev/**/*.php', reload);
	gulp.watch('dev/js/**/*.js', reload);
});

gulp.task('default', function(callback) {
	runSequence(['sass', 'browser-sync', 'watch'], callback) 
});


