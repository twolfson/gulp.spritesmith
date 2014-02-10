var gulp = require('gulp');
var spritesmith = require('../');

// Define our test tasks
var images = [
  'test-files/1.png',
  'test-files/2.jpg',
  'test-files/3.png'
];
console.log('wat');
gulp.task('sprite-default', function () {
  console.log('wat2');
  var spriteData = gulp.src(images).pipe(spritesmith());
  console.log(spriteData);
  spriteData.img.pipe(gulp.dest('actual-files/default/sprite.png'));
  spriteData.css.pipe(gulp.dest('actual-files/default/sprite.css'));
});

gulp.task('sprite-formats', function () {
  var spriteData = gulp.src(images).pipe(spritesmith({
    imgFormat: 'jpg',
    cssFormat: 'styl'
  }));
  spriteData.img.pipe(gulp.dest('actual-files/default/sprite.jpg'));
  spriteData.css.pipe(gulp.dest('actual-files/default/sprite.styl'));
});

gulp.task('sprite-options', function () {
  var spriteData = gulp.src(images).pipe(spritesmith({
    algorithm: 'alt-diagonal',
    engine: 'gm'
  }));
  spriteData.img.pipe(gulp.dest('actual-files/default/sprite.png'));
  spriteData.css.pipe(gulp.dest('actual-files/default/sprite.css'));
});
