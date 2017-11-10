// Load in dependencies
var gulp = require('gulp');
var merge = require('merge-stream');
var through2 = require('through2');
var spritesmith = require('../');

// Define our test tasks
var images = [
  'test-files/sprite1.png',
  'test-files/sprite2.png',
  'test-files/sprite3.png'
];
var retinaImages = [
  'test-files/sprite1.png',
  'test-files/sprite1@2x.png',
  'test-files/sprite2.png',
  'test-files/sprite2@2x.png',
  'test-files/sprite3.png',
  'test-files/sprite3@2x.png'
];
gulp.task('sprite-default', function () {
  return gulp.src(images)
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.css'
    }))
    .pipe(gulp.dest('actual-files/default/'));
});

gulp.task('sprite-retina', function () {
  return gulp.src(retinaImages)
    .pipe(spritesmith({
      retinaSrcFilter: 'test-files/*@2x.png',
      imgName: 'sprite.png',
      retinaImgName: 'sprite@2x.png',
      cssName: 'sprite.css'
    }))
    .pipe(gulp.dest('actual-files/retina/'));
});

gulp.task('sprite-two-streams', function () {
  var data = gulp.src(images)
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.css'
    }));
  var imgStream = data.img.pipe(gulp.dest('actual-files/two-streams/'));
  var cssStream = data.css.pipe(gulp.dest('actual-files/two-streams/'));
  return merge(imgStream, cssStream);
});

gulp.task('sprite-retina-two-streams', function () {
  var data = gulp.src(retinaImages).pipe(spritesmith({
    retinaSrcFilter: 'test-files/*@2x.png',
    imgName: 'sprite.png',
    retinaImgName: 'sprite@2x.png',
    cssName: 'sprite.css'
  }));
  var imgStream = data.img.pipe(gulp.dest('actual-files/retina-two-streams/'));
  var cssStream = data.css.pipe(gulp.dest('actual-files/retina-two-streams/'));
  return merge(imgStream, cssStream);
});

gulp.task('sprite-retina-same-name', function () {
  return gulp.src(retinaImages)
    .pipe(spritesmith({
      retinaSrcFilter: 'test-files/*@2x.png',
      imgName: 'sprite.png',
      retinaImgName: 'sprite@2x.png',
      cssVarMap: function (sprite) {
        // Coerce all 1x and 2x sprites to same name
        // DEV: This emulates `1x/icon.png` and `2x/icon.png` folders
        sprite.name = sprite.name.replace('@2x', '');
      },
      cssName: 'sprite.css'
    }))
    .pipe(gulp.dest('actual-files/retina-same-name/'));
});

gulp.task('sprite-formats', function () {
  return gulp.src(images, {read: false})
    .pipe(spritesmith({
      imgName: 'sprite.jpg',
      cssName: 'sprite.css',
      imgOpts: {
        format: 'png'
      },
      cssFormat: 'stylus',
      engine: 'phantomjssmith',
      // Use `top-down` for easier testing
      algorithm: 'top-down'
    }))
    .pipe(gulp.dest('actual-files/formats/'));
});

gulp.task('sprite-options', function () {
  return gulp.src(images)
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.css',
      imgPath: '../../everywhere.png',
      algorithm: 'alt-diagonal'
    }))
    .pipe(gulp.dest('actual-files/options/'));
});

gulp.task('sprite-template', function () {
  return gulp.src(images)
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.scss',
      cssTemplate: 'test-files/scss.template.handlebars',
      // Use `top-down` for easier testing
      algorithm: 'top-down'
    }))
    .pipe(gulp.dest('actual-files/template/'));
});

gulp.task('sprite-spritesheet-name', function () {
  return gulp.src(images)
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.scss',
      cssSpritesheetName: 'icons',
      // Use `top-down` for easier testing
      algorithm: 'top-down'
    }))
    .pipe(gulp.dest('actual-files/spritesheet-name/'));
});

gulp.task('sprite-retina-mapped', function () {
  return gulp.src(retinaImages)
    .pipe(spritesmith({
      retinaSrcFilter: 'test-files/*@2x.png',
      imgName: 'sprite.png',
      retinaImgName: 'sprite@2x.png',
      cssName: 'sprite.scss',
      cssSpritesheetName: 'icons',
      cssVarMap: function (sprite) {
        // Rename `sprite` to `icon` (e.g. `sprite1` -> `icon1`)
        sprite.name = sprite.name.replace('sprite', 'icon');
      },
      cssRetinaSpritesheetName: 'retina-icons',
      cssRetinaGroupsName: 'icon-groups',
      // Use `top-down` for easier testing
      algorithm: 'top-down'
    }))
    .pipe(gulp.dest('actual-files/retina-mapped/'));
});

gulp.task('sprite-empty', function () {
  return gulp.src(images)
    .pipe(through2.obj(
      // On data, do nothing and callback
      function onEmptyData(file, encoding, cb) {
        cb();
      },
      // On end, callback with nothing
      function onEmptyEnd(cb) {
        cb();
      }
    )).pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.scss'
    }))
    .pipe(gulp.dest('actual-files/empty/'));
});
