"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var del = require("del");
var run = require("run-sequence");
var minifyhtml = require("gulp-htmlmin");
var minifyjs = require("gulp-uglify");

/* Задание для очистки папки build
Команда gulp clean*/

gulp.task("clean", function () {
  return del("build");
});

/* Задание для копирования файлов в папку build
Что копировались не только файлы, но и папки, указываем, что базовая папка для gulp это source
Команда gulp copy*/

gulp.task("copy", function () {
  return gulp.src([
  "source/fonts/**/*.{woff,woff2}",
  "source/img/**",
  "source/js/**"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

/* Задание запускает препроцессор, собирает файл css, делает префиксы, миминизирует и снова созраняет в папку build
Команда gulp style*/

gulp.task("style", function () {
  gulp.src("source/sass/style.scss")
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(gulp.dest("build/css"))
  .pipe(minify())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"))
  .pipe(server.stream());
});

/* Задание делает спрайт из файлов, на которые мы указываем, в инлайновом виде, то есть можно вносить изменения через CSS
Команда gulp sprite*/

gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
});

/* Запускаем posthtml c плагином include, чтобы автоматически вставить спрайт в html файл, минифицируем html
Команда gulp html*/

gulp.task("html", function () {
  return gulp.src("source/*.html")
  .pipe(posthtml([
    include()
  ]))
  .pipe(minifyhtml({
    minifyJS: true,
    minifyURLs: true,
    collapseWhitespace: true,
    removeComments: true,
    sortAttributes: true,
    sortClassName: true
  }))
  .pipe(gulp.dest("build"))
  .pipe(server.stream());
});

/* Запускаем минификацию js*/

gulp.task("minjs", function () {
  gulp.src("source/js/script.js")
  .pipe(minifyjs())
  .pipe(gulp.dest("build/js"))
  .pipe(rename("script.min.js"))
  .pipe(gulp.dest("build/js"))
  .pipe(server.stream());
});

/* Запускаем последовательно все задания
Команда npm run build*/

gulp.task("build", function (done) {
  run(
  "clean",
  "copy",
  "style",
  "sprite",
  "html",
  "minjs",
  done
  );
});

/* Живой сервер разработки, отсеживает изменения в sass и html  файлах и если фиксирует их
прогоняет через все наши зависимости и загружает страницу с изменениями
Команда gulp serve*/

gulp.task("serve", function() {
  server.init({
    server: "build/"
    /*notify: false,
    open: true,
    cors: true,
    ui: false*/
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html", ["html"]);
  gulp.watch("source/*.js", ["js"]);
  /*gulp.watch("source/*.html").on("change", server.reload);*/
});
