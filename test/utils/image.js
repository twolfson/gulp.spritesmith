var fs = require('fs');
var pngparse = require('pngparse');

// Modified from https://github.com/mikolalysenko/get-pixels/blob/2ac98645119244d6e52afcef5fe52cc9300fb27b/node-pixels.js
// due to lack of loading '.jpg' as a '.png'
exports._loadImage = function (filepath, cb) {
  fs.readFile(filepath, function (err, buff) {
    if (err) {
      return cb(err);
    }
    pngparse.parse(buff, cb);
  });
};

exports.loadActual = function (filepath) {
  before(function (done) {
    var that = this;
    exports._loadImage(filepath, function (err, pixels) {
      that.actualPixels = pixels;
      done(err);
    });
  });
};

exports.loadExpected = function (filepath) {
  before(function (done) {
    var that = this;
    exports._loadImage(filepath, function (err, pixels) {
      that.expectedPixels = pixels;
      done(err);
    });
  });
};
