var gulp = require('gulp');
var spritesmith = require('../');

gulp.task('sprite', function () {
  // Collect png's from images folder and output a .png spritesheet and CSS classes
  // Alternative outputs include: SASS, Stylus, LESS, JSON
  var spriteData = gulp.src('images/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    algorithm: 'binary-tree'
  }));
  spriteData.img.pipe(gulp.dest('path/to/image/folder/'));
  spriteData.css.pipe(gulp.dest('path/to/css/folder/'));
});

gulp.task('sprite-cssvarmap', function () {
  var spriteData = gulp.src('images/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    cssVarMap: function (sprite) {
      // `sprite` has `name`, `image` (full path), `x`, `y`
      //   `width`, `height`, `total_width`, `total_height`
      // EXAMPLE: Prefix all sprite names with 'sprite-'
      sprite.name = 'sprite-' + sprite.name;
    }
  }));
  spriteData.img.pipe(gulp.dest('examples/cssvarmap/'));
  spriteData.css.pipe(gulp.dest('examples/cssvarmap/'));
});