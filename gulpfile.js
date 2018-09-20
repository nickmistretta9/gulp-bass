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
	rename= require('gulp-rename'),
	del = require('del'),
	merge = require('merge-stream'),
	flatten = require('gulp-flatten'),
	header = require('gulp-header'),
	babel = require('gulp-babel'),
	runSequence = require('run-sequence'),
	favicons = require('favicons').stream,
	gutil = require('gulp-util');

var reload = browserSync.reload;
var port = 8080;

gulp.task('plugins', function() {
	var min = gulp.src('bower_components/**/*.min.js')
	.pipe(flatten())
	.pipe(gulp.dest('dev/js/vendor'));

	var reg = gulp.src('bower_components/**/*.js')
	.pipe(flatten())
	.pipe(gulp.dest('dev/js/vendor'));

	return merge(min, reg);
});

gulp.task('plugin-styles', function() {
	var css = gulp.src('bower_components/**/*.css')
	.pipe(rename({extname: '.scss', prefix: '_'}))
	.pipe(flatten())
	.pipe(gulp.dest('dev/scss/vendor'));

	var scss = gulp.src('bower_components/**/*.scss')
	.pipe(rename({prefix: '_'}))
	.pipe(flatten())
	.pipe(gulp.dest('dev/scss/vendor'));

	return merge(css, scss);
});

gulp.task('fontawesome', function() {
	return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/**.*')
	.pipe(flatten())
	.pipe(gulp.dest('dev/fonts'))
});

gulp.task('php', function() {
	php.server({base: 'dev', port: port, keepalive:true});
});

gulp.task('browser-sync', ['php'], function() {
	var files = ['./*.php'];
	browserSync(files, {
		proxy: '127.0.0.1:' + port,
	});
});

gulp.task('images', function() {
	return gulp.src('dev/images/**/*.+(png|jpg|gif|svg)')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/images'))
});

gulp.task('css', function() {
	var plugins = [
		autoprefixer({browsers:['last 2 versions']}),
		cssnano({
		   reduceIdents: {
		       keyframes: false
		   },
		   discardUnused: {
		       keyframes: false
		   }
		})
	];
	return gulp.src('dev/css/*.css')
	.pipe(postcss(plugins))
	.pipe(gulp.dest('dist/css'));
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

gulp.task('useref', function() {
	return gulp.src('dev/**/*.php')
	.pipe(useref({searchPath: 'dev' }))
	.pipe(gulpIf('*.js', uglify()))
	.on('error', function(err) {
		console.log(err.toString());
		this.emit('end');
	})
	.pipe(gulp.dest('dist'))
});

gulp.task('babel', function() {
	return gulp.src('dev/js/**/*.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('clean:dist', function() {
	return del.sync('dist');
});

gulp.task('install-favicons', function() {
	return gulp.src('dev/images/favicon.png').pipe(favicons({
		icons: {
			android:false,
			appleIcon:false,
			appleStartup:false,
			coast:false,
			favicons:true,
			firefox:false,
			windows:false,
			yandex:false
		}
	}))
	.on("error", gutil.log)
	.pipe(gulp.dest('dev'));
});

gulp.task('clean-favicons', function() {
	return del.sync('dev/favicon-*.*');
});

gulp.task('favicons', function() {
	runSequence('install-favicons', 'clean-favicons')
});

gulp.task('clean:vendor', function() {
	return del.sync('dist/js/vendor');
});

gulp.task('scriptDate', function() {
	return gulp.src('dist/js/script.min.js')
	.pipe(header('/** Last Modified: <%= new Date() %>*/\n'))
	.pipe(gulp.dest('dist/js'))
});

gulp.task('styleDate', function() {
	return gulp.src('dist/css/main.css')
	.pipe(header('/** Last Modified: <%= new Date() %>*/\n'))
	.pipe(gulp.dest('dist/css'))
});

gulp.task('extras', function() {
	var access = gulp.src('dev/.htaccess')
	.pipe(flatten())
	.pipe(gulp.dest('dist'));

	var robots = gulp.src('dev/robots.txt')
	.pipe(flatten())
	.pipe(gulp.dest('dist'));

	var favicon = gulp.src('dev/favicon.ico')
	.pipe(flatten())
	.pipe(gulp.dest('dist'));

	var fonts = gulp.src('dev/fonts/**.*')
	.pipe(flatten())
	.pipe(gulp.dest('dist/fonts'));

	return merge(access, robots, favicon, fonts);
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
	gulp.watch('dev/scss/**/*.scss', ['sass'], reload);
	gulp.watch('dev/**/*.php', reload);
	gulp.watch('dev/js/**/*.js', reload);
});

gulp.task('default', function() {
	runSequence(['sass', 'browser-sync', 'watch']) 
});

gulp.task('build', function () {
	runSequence('clean:dist', ['useref', 'images', 'favicons'], ['css', 'babel'], ['scriptDate', 'styleDate'], ['clean:vendor', 'extras']) 
});