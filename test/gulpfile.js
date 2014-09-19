var gulp = require('gulp');
var spritesmith = require('../');

// Define our test tasks
var images = [
  'test-files/sprite1.png',
  'test-files/sprite2.png',
  'test-files/sprite3.png'
];
gulp.task('sprite-default', function () {
  gulp.src(images).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }))
  .pipe(gulp.dest('actual-files/default/'));
});

gulp.task('sprite-two-streams', function () {
  data = gulp.src(images).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  data.img.pipe(gulp.dest('actual-files/two-streams/'));
  data.css.pipe(gulp.dest('actual-files/two-streams/'));
});

gulp.task('sprite-formats', function () {
  gulp.src(images).pipe(spritesmith({
    imgName: 'sprite.jpg',
    cssName: 'sprite.css',
    imgOpts: {
      format: 'png'
    },
    cssFormat: 'stylus',
    engine: 'pngsmith'
  }))
  .pipe(gulp.dest('actual-files/formats/'));
});

gulp.task('sprite-options', function () {
  gulp.src(images).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    imgPath: '../../everywhere.png',
    algorithm: 'alt-diagonal'
  }))
  .pipe(gulp.dest('actual-files/options/'));
});

gulp.task('sprite-template', function () {
  gulp.src(images).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss',
    cssTemplate: 'test-files/scss.template.mustache'
  }))
  .pipe(gulp.dest('actual-files/template/'));
});

gulp.task('sprite-empty', function () {
  gulp.src([]).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss',
  }))
  .pipe(gulp.dest('actual-files/empty/'));
});
