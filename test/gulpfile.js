var gulp = require('gulp');
var spritesmith = require('../');

// Define our test tasks
var images = [
  'test-files/sprite1.png',
  'test-files/sprite2.png',
  'test-files/sprite3.png'
];
gulp.task('sprite-default', function () {
  var spriteData = gulp.src(images).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  spriteData.img.pipe(gulp.dest('actual-files/default/'));
  spriteData.css.pipe(gulp.dest('actual-files/default/'));
});

gulp.task('sprite-formats', function () {
  var spriteData = gulp.src(images).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    imgOpts: {
      format: 'jpg'
    },
    cssFormat: 'stylus',
    engine: 'gm'
  }));
  spriteData.img.pipe(gulp.dest('actual-files/formats/'));
  spriteData.css.pipe(gulp.dest('actual-files/formats/'));
});

gulp.task('sprite-options', function () {
  var spriteData = gulp.src(images).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    imgPath: '../../everywhere.png',
    algorithm: 'alt-diagonal',
    engine: 'pngsmith'
  }));
  spriteData.img.pipe(gulp.dest('actual-files/options/'));
  spriteData.css.pipe(gulp.dest('actual-files/options/'));
});
