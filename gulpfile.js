const {
  src, //метод из галпа что позволяет ссылаться на папку
  dest, // тоже метод из галпа
  series, //метод из галпа что обеспечивает послежовательное выполнение здач
  parallel, // тоже но параллельно
  watch //метод из галпа чтоб смотреть за чем-либо
} = require('gulp');
const sass = require('gulp-sass');

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var browserSync = require('browser-sync').create();


// // const plugins = [
// //   autoprefixer({
// //     browsers: ['last 2 version']
// //   }),
// //   // cssnano()
// // ];

// const sourcemaps = require('gulp-sourcemaps');

// function style() {
//   return src('/dev/scss/main.scss')
//     // .pipe(sourcemaps.init())
//     .pipe(sass())
//     // .pipe(postcss(plugins))
//     // .pipe(sourcemaps.write())
//     .pipe(dest('/prod/css'));

// }
// exports.style = style;

// // function copyHtml() {
// //   return src('dev/html/*.html')
// //     .pipe(dest('build'));

// // }
// // exports.copyHtml = copyHtml;

// // function watcher() {
// //   watch('dev/scss/**/*.scss', style);
// //   watch('dev/html/**/*.html', copyHtml);
// // }





// // exports.default = series(
// //   parallel(style, copyHtml),
// //   parallel(serve, watcher),
// // )

// exports.default = seriers(style)


function style() {
  return src('dev/scss/main.scss')
    // .pipe(sourcemaps.init())
    .pipe(sass())
    // .pipe(postcss(plugins))
    // .pipe(sourcemaps.write())
    .pipe(dest('prod/css'));
}
exports.style = style;


function watcher() {
  // watch('dev/scss/**/*.scss', style);
  watch('dev/html/**/*.html', copyHtml);
}

function copyHtml() {
  return src('dev/html/*.html')
    .pipe(dest('prod/html'));

}
exports.copyHtml = copyHtml;


function serve() {
  browserSync.init({
    server: {
      baseDir: "prod/html"
    }
  });
  browserSync.watch('prod/**/*.*', browserSync.reload);
}
exports.serve = serve;


exports.default = series(
  parallel(style, copyHtml),
  parallel(serve, watcher),
)