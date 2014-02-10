var Readable = require('stream').Readable;
var Writable = require('stream').Writable;
var gutil = require('gulp-util');

// TODO: Rough proof of concept - Send back a first image and some text


function gulpSpritesmith(params) {
  var images = [];
  var image;
  var inputComplete = false;
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
  spriteData.on('finish', function () {
    inputComplete = true;
  });

  spriteData.img = new Readable({
    objectMode: true
  });
  spriteData.img._read = function () {
    // If the stream has been finished, otherwise wait for the finish event
    if (inputComplete) {
      process.nextTick(sendResponse);
    } else {
      spriteData.on('finish', sendResponse);
    }

    var that = this;
    function sendResponse() {
      that.push(new gutil.File({
        path: params.imgName,
        contents: image.contents
      }));
      that.push(null);
    }
  };

  spriteData.css = new Readable({
    objectMode: true
  });
  spriteData.css._read = function () {
    if (inputComplete) {
      process.nextTick(sendResponse);
    } else {
      spriteData.on('finish', sendResponse);
    }

    var that = this;
    function sendResponse() {
      that.push(new gutil.file({
        path: params.cssName,
        contents: new Buffer('hello { world };')
      }));
      that.push(null);
    }
  };

  return spriteData;
}

module.exports = gulpSpritesmith;