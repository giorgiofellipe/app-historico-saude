var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var inject = require('gulp-inject');
var replace = require('gulp-replace-task');
var args    = require('yargs').argv;
var fs      = require('fs');

var paths = {
  source: {
    ionicCss: './scss/ionic.app.scss',
    sass: [
      './www/**/*.scss',
      './scss/**/*.scss',
      '!./www/lib/**/*.scss'
    ],
    css: [
      './www/**/*.min.css',
      '!./www/lib/**/*.css'
    ],
    js: [
      './www/*.js',
      './www/**/*.js',
      '!./www/config/*.js',
      '!./www/lib/**/*.js',
      '!./www/app.module.js'
    ]
  },
  dest: './www'
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  //Ionic
  gulp.src(paths.source.ionicCss)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'));

  //app
  gulp.src(paths.source.sass)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.dest))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch([paths.source.sass, paths.source.ionicCss, paths.source.js], ['sass', 'index']);
});

gulp.task('index', function(){
  return gulp.src('./www/index.html')
    .pipe(inject(gulp.src(paths.source.js, {read: false}), {relative: true}))
    .pipe(inject(gulp.src(paths.source.css, {read: false}), {relative: true}))
    .pipe(gulp.dest('./www'));
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('replace', function () {
  // Get the environment from the command line
  var env = args.env || 'dev';

  // Read the settings from the right file
  var filename = env + '.json';
  var settings = JSON.parse(fs.readFileSync('./www/config/' + filename, 'utf8'));

  // Replace each placeholder with the correct value for the variable.
  gulp.src('./www/config/app.constants.template.js')
    .pipe(replace({
      patterns: [
        {
          match: 'apiUrl',
          replacement: settings.apiUrl
        }
      ]
    }))
    .pipe(rename('app.constants.js'))
    .pipe(gulp.dest('./www'));
});