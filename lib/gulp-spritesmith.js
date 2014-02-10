var Readable = require('stream').Readable;
var Writable = require('stream').Writable;

// TODO: Rough proof of concept - Send back a first image and some text


function gulpSpritesmith(params) {
  var images = [];
  var image;
  // TODO: Relocate writable into class?
  var spriteData = new Writable({
    objectMode: true
  });
  spriteData._write = function (file, encoding, callback) {
    console.log('write', file);
    var filepath = file.path;
    if (filepath) {
      images.push(filepath);
    }
    image = file;
  };

  spriteData.img = new Readable({
    objectMode: true
  });
  spriteData.img._read = function () {
    console.log('hai', image);
    this.push(image);
    this.push(null);
  };

  return spriteData;
}

module.exports = gulpSpritesmith;