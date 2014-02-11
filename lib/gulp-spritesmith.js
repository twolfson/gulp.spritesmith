var Readable = require('stream').Readable;
var Writable = require('stream').Writable;
var gutil = require('gulp-util');

// TODO: Rough proof of concept - Send back a first image and some text


function gulpSpritesmith(params) {
  var images = [];
  var image;
  // TODO: Relocate writable into class?
  var spriteData = new Writable({
    objectMode: true
  });
  spriteData._write = function (file, encoding, cb) {
    var filepath = file.path;
    if (filepath) {
      images.push(filepath);
    }
    image = file;
    cb();
  };

  spriteData.img = new Readable({
    objectMode: true
  });
  spriteData.img._read = function () {
    // Do nothing, let the `finish` handler take care of this
  };

  spriteData.css = new Readable({
    objectMode: true
  });
  spriteData.css._read = function () {
    // Do nothing, let the `finish` handler take care of this
  };

  spriteData.on('finish', function () {
    spriteData.img.push(new gutil.File({
      path: params.imgName,
      contents: image.contents
    }));
    spriteData.img.push(null);

    spriteData.css.push(new gutil.File({
      path: params.cssName,
      contents: new Buffer('hello { world };')
    }));
    spriteData.css.push(null);
  });

  return spriteData;
}

module.exports = gulpSpritesmith;