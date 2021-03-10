"use strict";

const {
  src,
  dest,
  series,
  parallel,
  watch
} = require('gulp');

const sass = require('gulp-sass');
const cssImport = require('gulp-cssimport');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const del = require('del');

const config = {
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

function html() {
  return src(config.src.html)
    .pipe(dest(config.out.dist));
}

function images() {
  return src(config.src.images)
    .pipe(dest(config.out.images));
}

function fonts() {
  return src(config.src.fonts)
    .pipe(dest(config.out.fonts));
}

function css() {
  return src(config.src.css)
    .pipe(sass())
    .pipe(cssImport())
    .pipe(cleanCss({
      compatibility: '*'
    }))
    .pipe(concat('style.css'))
    .pipe(dest(config.out.dist));
}

exports.clean = function() {
  return del(config.out.dist);
}

exports.build = parallel(html, images, fonts, css);

exports.watch = function() {
  watch(config.src.html, html);
  watch(config.src.images, images);
  watch(config.src.fonts, fonts);
  watch(config.src.css, css);
};
