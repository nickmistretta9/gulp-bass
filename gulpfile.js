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
	babel = require('gulp-babel'),
	merge = require('merge-stream'),
	runSequence = require('run-sequence');

gulp.task('clean:dist', function() {
	return del.sync('dist');
});

gulp.task('images', function() {
	return gulp.src('dev/images/**/*.+(png|jpg|gif|svg)')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/images'))
});

gulp.task('font-concat', function() {
	var bootstrap = gulp.src('node_modules/bootstrap/fonts/**/*')
	.pipe(gulp.dest('dev/fonts/bootstrap'));
	
	var fontawesome = gulp.src('node_modules/font-awesome/**/*')
	.pipe(gulp.dest('dev/fonts'));

	var slick = gulp.src('node_modules/slick-carousel/slick/fonts/**/*')
	.pipe(gulp.dest('dev/fonts'));

	return merge(bootstrap, fontawesome, slick);
});

gulp.task('font-compile', function() {
	return gulp.src('dev/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
});

gulp.task('plugins-concat', function() {
	var slick = gulp.src('node_modules/slick-carousel/slick/slick.min.js')
	.pipe(gulp.dest('dev/js/vendor'));

	var magnific = gulp.src('node_modules/magnific-popup/dist/jquery.magnific-popup.min.js')
	.pipe(gulp.dest('dev/js/vendor'));

	var bootstrap = gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
	.pipe(gulp.dest('dev/js/vendor'));

	var match = gulp.src('node_modules/jquery-match-height/dist/jquery.matchHeight-min.js')
	.pipe(gulp.dest('dev/js/vendor'));

	var aos = gulp.src('node_modules/aos/dist/aos.js')
	.pipe(gulp.dest('dev/js/vendor'));

	var parallax = gulp.src('node_modules/jquery-parallax.js/parallax.min.js')
	.pipe(gulp.dest('dev/js/vendor'));

	return merge(slick, magnific, bootstrap, match, aos, parallax);
});

gulp.task('babel', function() {
	return gulp.src('dev/js/**/*.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest('dist'));
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
	.on('error', function(err) {
		console.log(err.toString());
		this.emit('end');
	})
	.pipe(gulp.dest('dev/css'))
	.pipe(reload({
		stream:true
	}))
});

gulp.task('build', function (callback) {
	runSequence('clean:dist', ['sass', 'useref', 'autoprefixer', 'babel', 'images', 'font-compile'], callback) 
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
	gulp.watch('dev/scss/**/*.scss', ['sass'], reload);
	gulp.watch('dev/**/*.php', reload);
	gulp.watch('dev/js/**/*.js', reload);
});

gulp.task('default', function(callback) {
	runSequence(['sass', 'font-concat', 'plugins-concat', 'browser-sync', 'watch'], callback) 
});
