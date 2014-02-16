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

exports.loadActualJpg = function (filepath) {
  before(function (done) {
    var that = this;
    fs.readFile(filepath, function (err, buff) {
      if (err) {
        return done(err);
      }
      that.actualPixels = jpeg.decode(buff);
      done();
    });
  });
};

exports.loadExpectedJpg = function (filepath) {
  before(function (done) {
    var that = this;
    fs.readFile(filepath, function (err, buff) {
      if (err) {
        return done(err);
      }
      that.expectedPixels = jpeg.decode(buff);
      done();
    });
  });
};
