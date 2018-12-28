var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean-css');
var webserver = require('gulp-webserver');
var path = require('path');
var fs = require('fs');
var url = require('url');
gulp.task('sass', function() {
        return gulp.src('./scss/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./css/'))
    })
    // gulp.task('watch', function() {
    //     return gulp.watch('./scss/*.scss', gulp.series('sass'))
    // })
gulp.task('clean', function() {
        return gulp.src('./css/*.css')
            .pipe(clean())
            .pipe(gulp.dest('./css/bulid/css'));
    })
    //起服务
gulp.task('webserver', function() {
    return gulp.src('render')
        .pipe(webserver({
            port: 8080,
            open: true,
            livereload: true,
            host: "192.168.0.48",
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return res.end();
                } else {
                    pathname = pathname === '/' ? "index.html" : pathname
                    res.end(fs.readFileSync(path.join(__dirname, 'render', pathname)));
                }
            }
        }))
})