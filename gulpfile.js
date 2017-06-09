var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('autoprefixer'),
	browserSync = require('browser-sync'),
	postcss = require('gulp-postcss'),
	php = require('gulp-connect-php'),
	useref = require('gulp-useref'),
	uglify = require('gulp-uglify'),
	cssnano = require('cssnano'),
	gulpIf = require('gulp-if'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	del = require('del'),
	flatten = require('gulp-flatten'),
	babel = require('gulp-babel'),
	runSequence = require('run-sequence');

var reload = browserSync.reload;

gulp.task('clean:dist', function() {
	return del.sync('dist');
});

gulp.task('images', function() {
	return gulp.src('dev/images/**/*.+(png|jpg|gif|svg)')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
	return gulp.src('dev/fonts')
	.pipe(flatten())
	.pipe(gulp.dest('dist/fonts'))
});

gulp.task('plugins', function() {
	return gulp.src('bower_components/**/*.min.js')
	.pipe(flatten())
	.pipe(gulp.dest('dev/js/vendor'))
});

gulp.task('plugin-styles', function() {
	return gulp.src('bower_components/**/*.scss')
	.pipe(flatten())
	.pipe(gulp.dest('dev/scss/vendor'))
});

gulp.task('babel', function() {
	return gulp.src('dev/js/**/*.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('useref', function() {
	return gulp.src('dev/**/*.php')
	.pipe(useref({searchPath: 'dev' }))
	.pipe(gulpIf('*.js', uglify()))
	.pipe(gulp.dest('dist'))
});

gulp.task('php', function() {
	php.server({base: 'dev', port: 8010, keepalive:true});
});

gulp.task('css', function() {
	var plugins = [
		autoprefixer({browsers:['last 2 versions']}),
		cssnano()
	];
	return gulp.src('dev/css/*.css')
	.pipe(postcss(plugins))
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
	.on('error', function(err) {
		console.log(err.toString());
		this.emit('end');
	})
	.pipe(gulp.dest('dev/css'))
	.pipe(reload({
		stream:true
	}))
});

gulp.task('build', function () {
	runSequence('clean:dist', ['useref', 'babel', 'images'], 'css') 
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
	gulp.watch('dev/scss/**/*.scss', ['sass'], reload);
	gulp.watch('dev/**/*.php', reload);
	gulp.watch('dev/js/**/*.js', reload);
});

gulp.task('default', function() {
	runSequence(['sass', 'browser-sync', 'watch']) 
});