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
    console.log('write', file);
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
    console.log('hai', image);
    this.push(new gutil.File({
      path: params.imgName,
      contents: image.contents
    }));
    this.push(null);
  };

  return spriteData;
}

module.exports = gulpSpritesmith;