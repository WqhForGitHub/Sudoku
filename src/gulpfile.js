const gulp = require('gulp');

// 转译JavaScript
gulp.task('webpack', () => {
    const webpack = require('webpack-stream')
    const config = require('./webpack.config.js')
   return gulp.src('./js/**/*.ts')
    .pipe(webpack(config, require('webpack')))
    .pipe(gulp.dest('../www/js'))
})

// 编译 less -> css
gulp.task('less', () => {
    const less = require('gulp-less')
    return gulp.src('./less/*.less')
    .pipe(less())
    .pipe(gulp.dest('../www/css'));
})

gulp.task('default', gulp.parallel('webpack', 'less'))

gulp.task('watch', () => {
    gulp.watch("less/**/*.less", gulp.series("less"));
    gulp.watch("js/**/*.js", gulp.series("webpack"));
})