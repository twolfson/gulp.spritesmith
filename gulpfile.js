var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('lint', function () {
  gulp.src(['gulpfile.js', 'lib/**/*.js', 'test/**/*.js'])
    .pipe(jshint({
      curly: true,
      eqeqeq: true,
      immed: true,
      latedef: true,
      newcap: true,
      noarg: true,
      sub: true,
      undef: true,
      boss: true,
      eqnull: true,
      node: true,
      strict: false,
      globals: {
        exports: true,
        describe: true,
        before: true,
        it: true
      }
    }))
    .pipe(jshint.reporter());
});

gulp.task('default', ['lint']);
