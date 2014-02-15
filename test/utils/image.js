var getPixels = require('get-pixels');

exports.loadActual = function (filepath) {
  before(function (done) {
    var that = this;
    getPixels(filepath, function (err, pixels) {
      that.actualPixels = pixels;
      done(err);
    });
  });
};

exports.loadExpected = function (filepath) {
  before(function (done) {
    var that = this;
    getPixels(filepath, function (err, pixels) {
      that.expectedPixels = pixels;
      done(err);
    });
  });
};
