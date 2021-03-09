"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssImport = require('gulp-cssimport');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');

var config = {
  src: {
    html: [
      'src/index.html'
    ],
    images: [
      'src/images/*.*'
    ],
    fonts: [
      'node_modules/@fortawesome/fontawesome-free/webfonts/*.*',
      'node_modules/@fontsource/open-sans/files/open-sans-latin-400-normal.woff2',
      'node_modules/@fontsource/open-sans/files/open-sans-all-400-normal.woff',
      'node_modules/@fontsource/roboto-slab/files/roboto-slab-latin-400-normal.woff2',
      'node_modules/@fontsource/roboto-slab/files/roboto-slab-all-400-normal.woff'
    ],
    css: [
      'src/scss/*.scss',
      'node_modules/@fortawesome/fontawesome-free/css/all.css'
    ]
  },
  out: {
    dist: 'dist',
    fonts: 'dist/webfonts',
    images: 'dist/images'
  }
};

gulp.task('build-html', function() {
  return gulp.src(config.src.html)
    .pipe(gulp.dest(config.out.dist))
});

gulp.task('build-images', function() {
  return gulp.src(config.src.images)
    .pipe(gulp.dest(config.out.images))
});

gulp.task('build-fonts', function() {
  return gulp.src(config.src.fonts)
    .pipe(gulp.dest(config.out.fonts))
});

gulp.task('build-css', function() {
  return gulp.src(config.src.css)
    .pipe(sass())
    .pipe(cssImport())
    .pipe(cleanCss({
      compatibility: '*'
    }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(config.out.dist));
});

gulp.task('build', gulp.parallel('build-html', 'build-images', 'build-fonts', 'build-css'));
