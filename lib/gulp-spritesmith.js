var Readable = require('stream').Readable;
var Writable = require('stream').Writable;
var gutil = require('gulp-util');

function gulpSpritesmith(params) {
  var images = [];
  var image;

  // TODO: Relocate logic into class?

  // Create a stream to take in images
  var spriteData = new Writable({objectMode: true});
  spriteData._write = function (file, encoding, cb) {
    var filepath = file.path;
    if (filepath) {
      images.push(filepath);
    }
    image = file;
    cb();
  };

  // Define our output streams
  spriteData.img = new Readable({objectMode: true});
  spriteData.img._read = function () {
    // Do nothing, let the `finish` handler take care of this
  };
  spriteData.css = new Readable({objectMode: true});
  spriteData.css._read = function () {
    // Do nothing, let the `finish` handler take care of this
  };

  // When we have completed our input
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

  // Return out input stream with 2 outputs
  return spriteData;
}

module.exports = gulpSpritesmith;