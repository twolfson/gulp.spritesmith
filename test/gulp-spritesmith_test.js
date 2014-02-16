var assert = require('assert');
var fs = require('fs');
var rimraf = require('rimraf');
var imageUtils = require('./utils/image.js');
var childUtils = require('./utils/child.js');

// Clean up actual-files directory
before(function (done) {
  rimraf(__dirname + '/actual-files/', done);
});

describe('gulp-spritesmith', function () {
  describe('running a task without any options', function () {
    childUtils.run('gulp sprite-default');
    imageUtils.loadActualPng(__dirname + '/actual-files/default/sprite.png');
    imageUtils.loadExpectedPng(__dirname + '/expected-files/default/mint-graphicsmagick.png');

    it('generates a top-down png', function () {
      assert.deepEqual(this.actualPixels, this.expectedPixels);
    });

    it('generates a css file', function () {
      var expectedCss = fs.readFileSync(__dirname + '/expected-files/default/sprite.css', 'utf8');
      var actualCss = fs.readFileSync(__dirname + '/actual-files/default/sprite.css', 'utf8');
      assert.strictEqual(actualCss, expectedCss);
    });
  });

  describe('running a task with output formats', function () {
    childUtils.run('gulp sprite-formats');
    imageUtils.loadActualJpg(__dirname + '/actual-files/formats/sprite.png');
    imageUtils.loadExpectedJpg(__dirname + '/expected-files/formats/mint-graphicsmagick.jpg');

    it('generates a top-down jpg', function () {
      console.log(this.actualPixels);
    });

    it.skip('generates a Stylus file', function () {

    });
  });

  describe('running a task with engine and algorithm options', function () {
    childUtils.run('gulp sprite-options');
    // imageUtils.loadActual(__dirname + '/actual-files/options/sprite.png');
    // imageUtils.loadExpected(__dirname + '/expected-files/options/mint-graphicsmagick.png');

    it.skip('generates an alt-diagonal png via the gm engine', function () {

    });

    it.skip('generates a CSS file with alt-diagonal coordinates', function () {

    });
  });
});
