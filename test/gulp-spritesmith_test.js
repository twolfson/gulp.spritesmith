var assert = require('assert');
var fs = require('fs');
var rimraf = require('rimraf');
var imageUtils = require('./utils/image.js');
var childUtils = require('./utils/child.js');

// Clean up actual-files directory
before(function (done) {
  rimraf(__dirname + '/actual-files/', done);
});

describe('gulp.spritesmith', function () {
  describe('running a task without any options', function () {
    childUtils.run('gulp sprite-default');
    imageUtils.loadActual(__dirname + '/actual-files/default/sprite.png');
    imageUtils.loadExpected(__dirname + '/expected-files/default/mint-graphicsmagick.png');

    it('generates a top-down png', function () {
      assert.deepEqual(this.actualPixels, this.expectedPixels);
    });

    it('generates a css file', function () {
      var actualCss = fs.readFileSync(__dirname + '/actual-files/default/sprite.css', 'utf8');
      var expectedCss = fs.readFileSync(__dirname + '/expected-files/default/sprite.css', 'utf8');
      assert.strictEqual(actualCss, expectedCss);
    });
  });

  describe('running a task with output formats', function () {
    childUtils.run('gulp sprite-formats');
    imageUtils.loadActual(__dirname + '/actual-files/formats/sprite.jpg');
    imageUtils.loadExpected(__dirname + '/expected-files/formats/mint-pngsmith.png');

    it('generates a top-down png (as a .jpg)', function () {
      assert.deepEqual(this.actualPixels, this.expectedPixels);
    });

    it('generates a Stylus file (as a .css)', function () {
      var actualCss = fs.readFileSync(__dirname + '/actual-files/formats/sprite.css', 'utf8');
      var expectedCss = fs.readFileSync(__dirname + '/expected-files/formats/sprite.styl', 'utf8');
      assert.strictEqual(actualCss, expectedCss);
    });
  });

  describe('running a task with engine and algorithm options', function () {
    childUtils.run('gulp sprite-options');
    imageUtils.loadActual(__dirname + '/actual-files/options/sprite.png');
    imageUtils.loadExpected(__dirname + '/expected-files/options/mint-pngsmith.png');

    it('generates an alt-diagonal png via the gm engine', function () {
      assert.deepEqual(this.actualPixels, this.expectedPixels);
    });

    it('generates a CSS file with alt-diagonal coordinates', function () {
      var actualCss = fs.readFileSync(__dirname + '/actual-files/options/sprite.css', 'utf8');
      var expectedCss = fs.readFileSync(__dirname + '/expected-files/options/sprite.css', 'utf8');
      assert.strictEqual(actualCss, expectedCss);
    });
  });

  describe('running a task with a custom CSS template', function () {
    childUtils.run('gulp sprite-template');
    imageUtils.loadActual(__dirname + '/actual-files/template/sprite.png');
    imageUtils.loadExpected(__dirname + '/expected-files/template/mint-graphicsmagick.png');

    it('generates a top-down png', function () {
      assert.deepEqual(this.actualPixels, this.expectedPixels);
    });

    it('generates a css file', function () {
      var actualCss = fs.readFileSync(__dirname + '/actual-files/template/sprite.scss', 'utf8');
      var expectedCss = fs.readFileSync(__dirname + '/expected-files/template/sprite.scss', 'utf8');
      assert.strictEqual(actualCss, expectedCss);
    });
  });
});
