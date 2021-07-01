"use strict";

const {
  src,
  dest,
  series,
  parallel,
  watch
} = require('gulp');

const glob = require('glob');
const i18n = require('gulp-html-i18n');
const htmlmin = require('gulp-htmlmin');
const jsonminify = require('gulp-jsonminify');
const sass = require('gulp-sass');
const cssImport = require('gulp-cssimport');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const del = require('del');

const config = {
  i18n: {
    langDir: 'src/lang',
    trace: true,
    createLangDirs: true,
    defaultLang: 'fr'
  },
  htmlmin: {
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true
  },
  cleanCss: {
    compatibility: '*'
  },
  babel: {
    targets: "> 0.2%, last 2 versions, not dead",
    presets: ["@babel/preset-env"],
    sourceMaps: true
  },
  src: {
    html: [
      'src/index.html'
    ],
    manifest: [
      'src/manifest.json'
    ],
    root: [
      'src/robots.txt',
      'src/sitemap.xml',
      'src/favicons/*.*'
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
    ],
    js: [
      'node_modules/jquery/dist/jquery.js',
      ...glob.sync('src/js/*.js')
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
    .pipe(i18n(config.i18n))
    .pipe(htmlmin(config.htmlmin))
    .pipe(dest(config.out.dist));
}

function delFrFolder() {
  return del(config.out.dist + '/fr');
}

function manifest() {
  return src(config.src.manifest)
    .pipe(jsonminify())
    .pipe(dest(config.out.dist));
}

function root() {
  return src(config.src.root)
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
    .pipe(cleanCss(config.cleanCss))
    .pipe(concat('style.css'))
    .pipe(dest(config.out.dist));
}

function js() {
  return browserify(config.src.js, { debug: true })
    .transform(babelify, config.babel)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('maps'))
    .pipe(dest(config.out.dist));
}

exports.clean = function() {
  return del(config.out.dist);
}

exports.build = parallel(series(html, delFrFolder), manifest, root, images, fonts, css, js);

exports.watch = function() {
  watch(config.src.html, series(html, delFrFolder));
  watch(config.i18n.langDir, series(html, delFrFolder));
  watch(config.src.manifest, manifest);
  watch(config.src.root, root);
  watch(config.src.images, images);
  watch(config.src.fonts, fonts);
  watch(config.src.css, css);
  watch(config.src.js, js);
};
