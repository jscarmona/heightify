var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('scripts', function() {
    gulp.src('./src/js/heightify.js')
        .pipe(uglify())
        .pipe(rename('heightify.min.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', [ 'scripts' ]);