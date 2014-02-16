var fs = require('fs');
var getPixels = require('get-pixels');
var jpeg = require('jpeg-js');

exports.loadActualPng = function (filepath) {
  before(function (done) {
    var that = this;
    getPixels(filepath, function (err, pixels) {
      that.actualPixels = pixels;
      done(err);
    });
  });
};

exports.loadExpectedPng = function (filepath) {
  before(function (done) {
    var that = this;
    getPixels(filepath, function (err, pixels) {
      that.expectedPixels = pixels;
      done(err);
    });
  });
};

exports._loadJpg = function (filepath, cb) {
  fs.readFile(filepath, function (err, buff) {
    if (err) {
      return cb(err);
    }
    cb(null, jpeg.decode(buff));
  });
};

exports.loadActualJpg = function (filepath) {
  before(function (done) {
    var that = this;
    exports._loadJpg(filepath, function (err, data) {
      that.actualPixels = data;
      done(err);
    });
  });
};

exports.loadExpectedJpg = function (filepath) {
  before(function (done) {
    var that = this;
    exports._loadJpg(filepath, function (err, data) {
      that.expectedPixels = data;
      done(err);
    });
  });
};
