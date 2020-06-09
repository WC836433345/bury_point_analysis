var gulp = require("gulp"),
    babel = require('gulp-babel'),
    uglify = require("gulp-uglify");

//js
gulp.task("build",function(done){
    gulp.src('./index.js')
    .pipe(babel({presets: ['es2015']}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    done();
})

//watch
// gulp.task("watch",function(done){
//     gulp.watch(['src/*.js'])
//     done();
// })



gulp.task("default",gulp.series("build",function(done){
    done()
}));